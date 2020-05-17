var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.urlencoded({extended: true}));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'Art Projects Manager' 
    });
});

//on post from edit projects page
router.post('/submitted', function (req, res) {
    console.log(req.body.name)
});

module.exports = router;
