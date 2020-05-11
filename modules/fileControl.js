const express = require('express');
const fs = require('fs');

const materialsPath = './records/materials.json';

var methods = {
    //add an object to a given JSON array file
    addToFile: function (obj, file) {
        var fileContents = fs.readFileSync(file, 'utf8');
        var parsed = JSON.parse(fileContents);
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
        allMaterials.objects.forEach((e1) => {
            //case 1b
            if (usedMaterials.includes(e1.name)) {
                if (!e1.relProjects.includes(project)) {
                    e1.relProjects.push(project);
                    fs.writeFileSync(materialsPath, JSON.stringify(allMaterials));
                    console.log('updated \"' + e1.name + '\" with project: \"' + project + '\"');
                }
            }
            //case 2b 
            else {

            }
        });
    },

    demo: function () {
        console.log('Hello World');
    }
}

exports.method = methods;
