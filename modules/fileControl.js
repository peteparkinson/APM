const express = require('express');
const fs = require('fs');

var methods = {
    //add an object to a given JSON array file
    addToFile: function (obj, file) {
        var fileContents = fs.readFileSync(file, 'utf8');
        var parsed = JSON.parse(fileContents);
        if(methods.present(obj, parsed)){
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
    removeFromFile: function (str, file){
        var fileContents = fs.readFileSync(file, 'utf8'); //parse JSON file into usable array
        var parsed = JSON.parse(fileContents);
        for(let i = 0; i < parsed.objects.length; i++){
            if(parsed.objects[i].name == str){     
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
    
    getSerial: function(file){
        const fileContents = fs.readFileSync(file, 'utf8');
        var parsed = JSON.parse(fileContents);
        var ser = 1000;
        for(let i = 0; i < parsed.objects.length ; i++){
            if(parsed.objects[i].serial >= ser){
                ser = parsed.objects[i].serial + 1;
            }
        }
        console.log("Assigned serial numer: " + ser)
        return ser;
    },

    //checks for presence of object in an array
    present: function(obj, arr){
        for(let i = 0; i < arr.objects.length; i++){
            if(arr.objects[i].name == obj.name){     
                return true;
            }
        }
        return false;
    },

    demo: function(){
        console.log('Hello World');
    }
}

exports.method = methods;
