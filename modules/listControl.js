const express = require('express');
const fs = require('fs');

const materialTypes = [
    "",
    "Ceramic",
    "Clay",
    "Cloth",
    "Glass",
    "Metal",
    "Other",
    "Paper",
    "Plastic",
    "Sand",
    "Stone",
    "String",
    "Wood"
];

const projectTypes = [
    "",
    "Cross Stitch",
    "Jewelry",
    "Other",
    "Painting",
    "Print",
    "Shadow Box",
    "Wood Burning"
];

var methods = {

    demo: function(){
        console.log('list control connected');
    }

}

exports.method = methods;
exports.materialTypes = materialTypes;
exports.projectTypes = projectTypes;
