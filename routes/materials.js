var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var fileControl = require('../modules/fileControl.js');
var listControl = require('../modules/listControl.js')

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.urlencoded({extended: true}));

// GET page ./materials
router.get('/', function (req, res, next) {
    var allMaterials = JSON.parse(fs.readFileSync('./records/materials.json', 'utf8'));
    var types = listControl.materialTypes;
    var matStr = JSON.stringify(allMaterials);
    res.render('materials', {
        title: 'Manage Materials',
        allMaterials,
        types,
        matStr,
    });
});

/***********************************
 * This section submits a new material, kept in 'req.body'.  
 * the 'addToFile' method tries to write the passed object to the passed path
 ***********************************/
router.post('/submitted', function (req, res) {
    var file = './records/materials.json';
    req.body.serial = fileControl.method.getSerial('./records/materials.json');
    req.body.relProjects = [];
    fileControl.method.addToFile(req.body, file);
    res.redirect('/materials');
});

/***********************************
 * This section deletes a material, kept in 'req.body'.  
 * the 'removeFromFile' method tries to remove the object from the file passed
 ***********************************/
router.post('/deleted', function (req, res) {
    var file = './records/materials.json';
    fileControl.method.removeFromFile(req.body.box1, file);
    res.redirect('/materials');
});

module.exports = router;