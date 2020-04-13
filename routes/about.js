var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { 
      title: 'Say Anything',
      message: 'this is an explanation of the website'
    });
});

module.exports = router;

