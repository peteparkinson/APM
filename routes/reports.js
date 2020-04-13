var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reports', { 
      title: 'Reports',
      message: 'this is where you can track production costs'
    });
});

module.exports = router;

