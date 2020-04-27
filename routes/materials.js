var express = require('express');
var router = express.Router();
var fileControl = require('../modules/fileControl.js');

router.use(express.urlencoded());

// GET page ./materials
router.get('/', function(req, res, next) {
  res.render('materials', { 
      title: 'Manage Materials',
    });
});

/***********************************
 * This section submits a new material, kept in 'req.body'.  
 * the 'addToJSON' method tries to write the passed object to the passed path
 ***********************************/
router.post('/submitted', function(req, res) {
    var file = 'records/materials.json';
    var newMaterial = JSON.stringify(req.body);

    //fileControl.method.addToFile(newMaterial, file);

    var json = JSON.parse(obj);
    console.log(json.materials[0]);
    json.materials.push(obj);    
    fs.writeFile(file, JSON.stringify(json), function(err){
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

    res.render('submitted', { 
        title: 'Art Projects Manager',
    });
});

module.exports = router;

