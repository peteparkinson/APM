var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('editprojects', { 
      title: 'New / Edit Projects',
      message: 'this is where projects are created and edited'
    });
});

module.exports = router;

