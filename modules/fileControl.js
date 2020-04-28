const express = require('express');
const fs = require('fs');

var methods = {
    //add an object to a JSON array on file
    addToFile: function (obj, file) {
        const fileContents = fs.readFileSync(file, 'utf8');
        try {
            const parsed = JSON.parse(fileContents);
            parsed.materials.push(obj);
<<<<<<< HEAD
            fs.writeFile(file, JSON.stringify(parsed), function (err) {
=======
            fs.writeFile(file, JSON.stringify(parsed), function(err){
>>>>>>> 94c0a410a0896e384328f405ad8eb3ecb4e72ca5
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        } catch (err) {
            console.log(err);
        }
<<<<<<< HEAD
=======
    },

    testMe() {
        console.log('I\'m working');
>>>>>>> 94c0a410a0896e384328f405ad8eb3ecb4e72ca5
    }
}

exports.method = methods;