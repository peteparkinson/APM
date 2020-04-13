var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customers', { 
      title: 'Dustomers',
      message: 'this is where you can manage customer information'
    });
});

module.exports = router;

