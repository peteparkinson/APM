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
    "Shadow Box",
    "Wood Burning",
    "Print",
    "Cross Stitch",
    "Painting",
    "Jewelry",
    "Other"
];

var methods = {

    demo: function(){
        console.log('Hello Wulrd');
    }

}

exports.method = methods;
exports.materialTypes = materialTypes;
exports.projectTypes = projectTypes;
