var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { 
      title: 'Projects',
      message: 'this is where projects are viewed'
    });
});

module.exports = router;

