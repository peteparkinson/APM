var express = require('express');
var router = express.Router();
var fileControl = require('../modules/fileControl.js');

router.use(express.urlencoded());


// GET page ./materials
router.get('/', function (req, res, next) {

    res.render('materials', {
        title: 'Manage Materials',
    });
});

/***********************************
 * This section submits a new material, kept in 'req.body'.  
 * the 'addToFile' method tries to write the passed object to the passed path
 ***********************************/
router.post('/submitted', function (req, res) {
    var file = 'records/materials.json';
    fileControl.method.addToFile(req.body, file);    
    res.render('submitted', {
        title: 'Art Projects Manager',
    });
});

module.exports = router;

