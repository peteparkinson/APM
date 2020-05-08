var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

const fileControl = require('../modules/fileControl.js');
const listControl = require('../modules/listControl.js');
const customersPath = './records/customers.json';
const projectsPath = './records/projects.json';
const materialsPath = './records/materials.json';

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.urlencoded({extended: true}));

//on get edit projects page
router.get('/', function (req, res, next) {
    var allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    var allMaterials = JSON.parse(fs.readFileSync(materialsPath, 'utf8'));
    var allCustomers = JSON.parse(fs.readFileSync(customersPath, 'utf8'));
    var proStr = JSON.stringify(allProjects);
    var types = listControl.projectTypes;
    res.render('editprojects', {
        title: 'New / Edit Projects',
        allProjects,
        allMaterials,
        allCustomers,
        proStr,
        types,

    });
});

//on post from edit projects page
router.post('/submitted', function (req, res) {
    if(req.body.relMaterials){
        //interpret relMaterials as an array if there's only 1 elemet
        if(!Array.isArray(req.body.relMaterials)){
            req.body.relMaterials = [req.body.relMaterials];
        } 
        //TODO       
        //updates material files
        //updateMaterials(req.body)
    }

    req.body.serial = fileControl.method.getSerial(projectsPath);
    req.body.status = "open";
    req.body.hours = "0";
    req.body.charge = "0";
    fileControl.method.addToFile(req.body, projectsPath);
    res.redirect('/editprojects');
});


//delete project post response
router.post('/deleted', function (req, res) {
    var file = './records/projects.json';
    fileControl.method.removeFromFile(req.body.projects, file);
    res.redirect('/editprojects');
});

module.exports = router;
