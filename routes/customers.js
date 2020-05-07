var express = require('express');
var router = express.Router();
var fs = require('fs');

const customersPath = './records/customers.json';

/* GET home page. */
router.get('/', function(req, res, next) {
    var allCustomers = JSON.parse(fs.readFileSync(customersPath, 'utf8'));
    res.render('customers', { 
        title: 'Customers',
        allCustomers,

    });
});

//on post from edit projects page
router.post('/submitted', function (req, res) {
    console.log(req.body.relMaterials);

    res.redirect('/customers');
});


//delete project post response
router.post('/deleted', function (req, res) {
    res.redirect('/customers');
});

module.exports = router;

