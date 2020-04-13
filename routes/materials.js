var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('materials', { 
      title: 'Materials',
      message: 'this is where you\'ll manage materials inventory'
    });
});

module.exports = router;

