var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.urlencoded({extended: true}));

const fileControl = require('../modules/fileControl.js');
const materialsPath = './records/materials.json';
const projectsPath = './records/projects.json';

/* GET home page. */
router.get('/', function (req, res, next) {
    var allMaterials = JSON.parse(fs.readFileSync(materialsPath, 'utf8'));
    var allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    var matStr = JSON.stringify(allMaterials);
    var proStr = JSON.stringify(allProjects);
    res.render('projects', {
        title: 'Projects',
        allProjects,
        matStr,
        proStr,
    });
});


//User submits a project to close
router.post('/closed', function (req, res) {
    fileControl.method.closeProject(req.body.openProjects);
    res.redirect('/projects');
});

//User reopens a project
router.post('/reopen', function (req, res) {
    fileControl.method.openProject(req.body.closedProjects);
    res.redirect('/projects');
});

//User updates costs for a project
router.post('/submitted', function (req, res) {
    console.log(req.body);
    res.redirect('/projects');
});

module.exports = router;
