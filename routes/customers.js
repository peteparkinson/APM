var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

const fileControl = require('../modules/fileControl.js');
const customersPath = './records/customers.json';

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
    var allCustomers = JSON.parse(fs.readFileSync(customersPath, 'utf8'));
    var custStr = JSON.stringify(allCustomers);
    res.render('customers', { 
        title: 'Customers',
        allCustomers,
        custStr,
    });
});

//on post from edit projects page
router.post('/submitted', function (req, res) {
    
    if (req.body.relProjects) {
        //interpret relProjects as an array if there's only 1 elemet
        if (!Array.isArray(req.body.relProjects)) {
            req.body.relProjects = [req.body.relProjects];
        }
    }

    console.log(req.body.name);
    console.log(req.body.relProjects);
    req.body.serial = fileControl.method.getSerial(customersPath);
    fileControl.method.addToFile(req.body, customersPath);
    res.redirect('/customers');
});


//delete project post response
router.post('/deleted', function (req, res) {

    res.redirect('/customers');
});

module.exports = router;

