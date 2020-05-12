var express = require('express');
var router = express.Router();
var fs = require('fs');

const projectsPath = './records/projects.json';

/* GET home page. */
router.get('/', function (req, res, next) {
    var allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    var proStr = JSON.stringify(allProjects);
    res.render('projects', {
        title: 'Projects',
        allProjects,
        proStr,
    });
});

module.exports = router;

