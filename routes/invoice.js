var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('invoice', { 
      title: 'Invoice',
      message: 'this is where you can invoice projects'
    });
});

module.exports = router;

