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

    removeFromFile: function (obj, file){
        console.log('connected');
        const fileContents = fs.readFileSync(file, 'utf8');
        try {
            var json = JSON.parse(fileContents);
            var materials = json.materials;
            json.materials = materials.filter((item) => { return item.name !== obj.name });
            fs.writeFileSync(file, JSON.stringify(json, null, 2));
        } catch (err) {
            console.log(err);
        }
    },

    demo: function(){
        console.log('Hello World');
    }
}

exports.method = methods;
