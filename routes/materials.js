var express = require('express');
var router = express.Router();
var fileControl = require('../modules/fileControl.js');
var fs = require('fs');
var bodyParser = require('body-parser');
var lstControl = require('../modules/listControl')

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.urlencoded({extended: true}));

// GET page ./materials
router.get('/', function (req, res, next) {
    var allMaterials = JSON.parse(fs.readFileSync('./records/materials.json', 'utf8'));
    var types = lstControl.materialTypes;
    res.render('materials', {
        title: 'Manage Materials',
        allMaterials,
        types,
    });
});

/***********************************
 * This section submits a new material, kept in 'req.body'.  
 * the 'addToFile' method tries to write the passed object to the passed path
 ***********************************/
router.post('/submitted', function (req, res) {
    var file = './records/materials.json';
    var obj = req.body;
    obj.testAttribute = "test";
    fileControl.method.addToFile(req.body, file);
    res.redirect('/materials');
});

/***********************************
 * This section deletes a material, kept in 'req.body'.  
 * the 'removeFromFile' method tries to remove the object from the file passed
 ***********************************/
router.post('/deleted', function (req, res) {
    var file = './records/materials.json';
    fileControl.method.removeFromFile(req.body, file);
    res.redirect('/materials');
});

module.exports = router;
