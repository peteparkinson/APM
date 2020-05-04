var express = require('express');
var router = express.Router();
var fs = require('fs');

const listControl = require('../modules/listControl.js');
const projectsPath = './records/projects.json';
const materialsPath = './records/materials.json';

//on get edit projects page
router.get('/', function (req, res, next) {
    var allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    var allMaterials = JSON.parse(fs.readFileSync(materialsPath, 'utf8'));
    var proStr = JSON.stringify(allProjects);
    var types = listControl.projectTypes;
    res.render('editprojects', {
        title: 'New / Edit Projects',
        allProjects,
        allMaterials,
        proStr,
        types,

    });
});

//on post from edit projects page
router.post('/submitted', function (req, res) {
    req.body.serial = fileControl.method.getSerial(projectsPath);
    req.body.status = "open";
    req.body.hours = "0";
    req.body.charge = "0";
    req.body.relMaterials = [];
    fileControl.method.addToFile(req.body, projectsPath);
    res.redirect('/editprojects');
});

module.exports = router;


