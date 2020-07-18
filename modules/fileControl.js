const express = require('express');
const fs = require('fs');

const materialsPath = './records/materials.json';
const projectsPath = './records/projects.json';
const customersPath = './records/customers.json';

var methods = {
    //add an object to a given JSON array file
    addToFile: function (obj, file) {
        var fileContents = fs.readFileSync(file, 'utf8');
        var parsed = JSON.parse(fileContents);
        //if adding an object to file, and the object is already there, update it
        if (methods.present(obj, parsed)) {
            methods.removeFromFile(obj.name, file);
            //refresh parsed data with object removed from array
            parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
        }
        parsed.objects.push(obj);
        try {
            fs.writeFile(file, JSON.stringify(parsed), function (err) {
                if (err) throw err;
                console.log('Added \"' + obj.name + '\" to ' + file);
            });
        } catch (err) {
            console.log(err);
        }
    },

    //remove an object from a give JSON array file
    //reads file into RAM, splices array, overwrites file with spliced array
    removeFromFile: function (str, file) {
        var fileContents = fs.readFileSync(file, 'utf8'); //parse JSON file into usable array
        var parsed = JSON.parse(fileContents);
        for (let i = 0; i < parsed.objects.length; i++) {
            if (parsed.objects[i].name == str) {
                parsed.objects.splice(i, 1);                //removes item from array
                try {
                    fs.writeFileSync(file, JSON.stringify(parsed));
                    console.log('Deleted \"' + str + '\" from ' + file);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    },

    getSerial: function (file) {
        const fileContents = fs.readFileSync(file, 'utf8');
        var parsed = JSON.parse(fileContents);
        var ser = 1000;
        for (let i = 0; i < parsed.objects.length; i++) {
            if (parsed.objects[i].serial >= ser) {
                ser = parsed.objects[i].serial + 1;
            }
        }
        console.log("Assigned serial numer: " + ser)
        return ser;
    },

    //checks for presence of object in an array
    present: function (obj, arr) {
        for (let i = 0; i < arr.objects.length; i++) {
            if (arr.objects[i].name == obj.name) {
                return true;
            }
        }
        return false;
    },

    /*************************************
     * This updates the "related projects" lists for all materials
     * 
     * There are 4 cases, 
     *  1. the user has assigned the material to the project
     *      a. and the project is already on the list (do nothing)
     *      b. the project is not on the list, and needs added
     * 
     *  2. the user has NOT assigned the material to the project
     *      a. the project is not on the list (do nothing)
     *      b. the project is on the list and needs removed
    *************************************/
    updateMaterials: function (project, usedMaterials) {
        var fileContents = fs.readFileSync(materialsPath, 'utf8');
        var allMaterials = JSON.parse(fileContents);
        fileContents = fs.readFileSync(projectsPath, 'utf8');
        var allProjects = JSON.parse(fileContents);

        //this updates the quantities for each material
        allProjects.objects.forEach((e1) => {
            if (e1.name == project) {
                allMaterials.objects.forEach((e2) => {
                    var adjustment = this.occurrenceOf(e2.name, e1.relMaterials)
                        - this.occurrenceOf(e2.name, usedMaterials);
                    e2.qty = parseInt(e2.qty) + adjustment;
                });
                fs.writeFileSync(materialsPath, JSON.stringify(allMaterials));
            }
        });

        allMaterials.objects.forEach((e) => {
            console.log(e.qty);
        });

        allMaterials.objects.forEach((e) => {
            //case 1b
            if (usedMaterials && usedMaterials.includes(e.name)) {
                if (!e.relProjects.includes(project)) {
                    e.relProjects.push(project);
                    fs.writeFileSync(materialsPath, JSON.stringify(allMaterials));
                    console.log('updated \"' + e.name + '\" with project: \"' + project + '\"');
                }
            }
            //case 2b 
            else if (e.relProjects.includes(project)) {
                var index = e.relProjects.indexOf(project);
                e.relProjects.splice(index, 1);
                fs.writeFileSync(materialsPath, JSON.stringify(allMaterials));
                console.log('removed \"' + project + '\" from \"' + e.name + '\"');
            }
        });



    },

    //this should be combined with the function above
    updateCustomer: function (project, cust) {
        var fileContents = fs.readFileSync(customersPath, 'utf8');
        var allCustomers = JSON.parse(fileContents);
        allCustomers.objects.forEach((e) => {
            //adds project to to "related projects" attribute of a customer
            if (cust && e.name == cust) {
                if (!e.relProjects.includes(project)) {
                    console.log('adding project \"' + project + '\" to customer file for \"' + e.name + '\"');
                    e.relProjects.push(project);
                    fs.writeFileSync(customersPath, JSON.stringify(allCustomers));
                }
            } else {
                //if customer isn't related to project, this removes the project from their attributes
                if (e.relProjects.includes(project)) {
                    var index = e.relProjects.indexOf(project);
                    e.relProjects.splice(index, 1);
                    fs.writeFileSync(customersPath, JSON.stringify(allCustomers));
                    console.log('removed \"' + project + '\" from \"' + e.name + '\"');
                }
            }
        });
    },

    deleteProject: function (pro) {
        //update related materials and customer, then remove from file
        var allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
        var allCustomers = JSON.parse(fs.readFileSync(customersPath, 'utf8'));
        var allMaterials = JSON.parse(fs.readFileSync(materialsPath, 'utf8'));
        allProjects.objects.forEach(e1 => {
            if (pro && e1.name == pro) {
                //remove project from related materials files
                allMaterials.objects.forEach(e2 => {
                    if (e1.relMaterials.includes(e2.name)) {
                        var index = e2.relProjects.indexOf(pro);
                        e2.relProjects.splice(index, 1);
                        fs.writeFileSync(materialsPath, JSON.stringify(allMaterials));
                        console.log('removed \"' + pro + '\" from \"' + e2.name + '\"');
                    }
                });
                //removes project from customer's file
                allCustomers.objects.forEach(e2 => {
                    if (e1.customer == e2.name) {
                        var index = e2.relProjects.indexOf(pro);
                        e2.relProjects.splice(index, 1);
                        fs.writeFileSync(customersPath, JSON.stringify(allCustomers));
                        console.log('removed \"' + pro + '\" from \"' + e2.name + '\"');
                    }
                });
            }
        });
        this.removeFromFile(pro, './records/projects.json');
    },

    closeProject: function (pro) {
        var fileContents = fs.readFileSync(projectsPath, 'utf8');
        var allProjects = JSON.parse(fileContents);
        allProjects.objects.forEach((e) => {
            if (pro && e.name == pro) {
                e.status = "closed";
                this.addToFile(e, projectsPath);
            }
        });
    },

    occurrenceOf: function (e, arr) {
        let count = 0;
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == e) {
                    count++;
                }
            }
        }
        return count;
    },

    openProject: function (pro) {
        var fileContents = fs.readFileSync(projectsPath, 'utf8');
        var allProjects = JSON.parse(fileContents);
        allProjects.objects.forEach((e) => {
            if (pro && e.name == pro) {
                e.status = "open";
                this.addToFile(e, projectsPath);
                console.log("reopened project: " + e.name);
            }
        });
    }
}

exports.method = methods;
