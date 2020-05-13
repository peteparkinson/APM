var express = require('express');
var router = express.Router();
var fs = require('fs');

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

module.exports = router;

