var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

const fileControl = require('../modules/fileControl.js');
const listControl = require('../modules/listControl.js');
const customersPath = './records/customers.json';
const projectsPath = './records/projects.json';
const materialsPath = './records/materials.json';

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true }));

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
    var allMaterials = JSON.parse(fs.readFileSync(materialsPath, 'utf8'));
    if (req.body.relMaterials) {
        //interpret relMaterials as an array if there's only 1 elemet
        if (!Array.isArray(req.body.relMaterials)) {
            req.body.relMaterials = [req.body.relMaterials];
        }

        /*************************************
         * Updates material files.
         * loop all materials, then loop and check related projects for each material
         * add the submitted project (req.body) to the related 
         *  materials list, if it isn't already on there.
         * if the related projects attribute already contains the project name, but the 
         *  user removed it from the list, remove the project from the related object 
        *************************************/
       
        //TODI

        if(req.body.relMaterials.includes('blank test')){
            console.log('it\'s a miracle');
        }

        allMaterials.objects.forEach((e1) => {
            e1.relProjects.forEach((e2) => {

                if(e2 == req.body.name){
                    console.log('found again ' + req.body.name)
                }
            });
        });

        /*
        let mat = allMaterials.objects;
        for (let i = 0; i < mat.length; i++) {
            for (let j = 0; j < mat[i].relProjects.length; j++) {
                if (mat[i].relProjects[j] == req.body.name) {
                    console.log('found ' + req.body.name)
                }
            }
        }
        */
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
