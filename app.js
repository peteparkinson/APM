var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var about = require('./routes/about');
var materials = require('./routes/materials');
var projects = require('./routes/projects');
var editprojects = require('./routes/editprojects');
var customers = require('./routes/customers');
var invoice = require('./routes/invoice');
var reports = require('./routes/reports');
var app = express();


/**********************************
 * this line lets you create a global variable.
 * can use JSON files
 * 
    //app.locals.videodata = require('./videodata.json');
 *
 *********************************/
app.locals.videodata = require('./videodata.json');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);                  // home page
app.use('/about', about);                   // help page for the user
app.use('/materials', materials);           // manage inventory levels
app.use('/projects', projects);             // view projects only
app.use('/editprojects', editprojects);     // create and edit projects
app.use('/customers', customers);           // add, remove, edit, view customer data
app.use('/invoice', invoice);               // print invoices
app.use('/reports', reports);               // view profit / cost analysis, trends

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
