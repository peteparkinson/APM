var express = require('express');
var router = express.Router();
var fileControl = require('../modules/fileControl.js');
var fs = require('fs');

router.use(express.urlencoded());


// GET page ./materials
router.get('/', function (req, res, next) {
    var allMaterials = JSON.parse(fs.readFileSync('./records/materials.json', 'utf8'));
    res.render('materials', {
        title: 'Manage Materials',
        allMaterials,
    });
});

/***********************************
 * This section submits a new material, kept in 'req.body'.  
 * the 'addToFile' method tries to write the passed object to the passed path
 ***********************************/
router.post('/submitted', function (req, res) {
    var file = './records/materials.json';
    fileControl.method.addToFile(req.body, file);
    res.redirect('/materials');
});

module.exports = router;
