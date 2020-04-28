var express = require('express');
var router = express.Router();
var fileControl = require('../modules/fileControl.js');

router.use(express.urlencoded());


// GET page ./materials
router.get('/', function (req, res, next) {
<<<<<<< HEAD

=======
>>>>>>> 94c0a410a0896e384328f405ad8eb3ecb4e72ca5
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
<<<<<<< HEAD
    fileControl.method.addToFile(req.body, file);    
=======
    fileControl.method.addToFile(req.body, file);
>>>>>>> 94c0a410a0896e384328f405ad8eb3ecb4e72ca5
    res.render('submitted', {
        title: 'Art Projects Manager',
    });
});

module.exports = router;

