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
    req.body.serial = fileControl.method.getSerial(customersPath);
    //if the user is editing an existing user, there might be related projects
    if (req.body.relProjects) {
        //interpret relProjects as an array if there's only 1 element
        if (!Array.isArray(req.body.relProjects)) {
            req.body.relProjects = [req.body.relProjects];
        }
    } else {
        req.body.relProjects = [];
    }

    //addToFile handles duplicates by overwriting. use confirms overwrite
    fileControl.method.addToFile(req.body, customersPath);
    res.redirect('/customers');
});


//delete project post response
router.post('/deleted', function (req, res) {
    fileControl.method.removeFromFile(req.body.name, './records/customers.json');
    res.redirect('/customers');
});

module.exports = router;

