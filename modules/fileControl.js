const express = require('express');
const fs = require('fs');

var methods = {
    //add an object to a JSON array on file
    addToFile: function (obj, file) {
        const fileContents = fs.readFileSync(file, 'utf8');
        try {
            const parsed = JSON.parse(fileContents);
            parsed.materials.push(obj);
            fs.writeFile(file, JSON.stringify(parsed), function (err) {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        } catch (err) {
            console.log(err);
        }
    },

    demo: function(){
        console.log('working');
    }
}

exports.method = methods;