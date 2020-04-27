var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var materials = require('./routes/materials');
var projects = require('./routes/projects');
var editProjects = require('./routes/editProjects');
var customers = require('./routes/customers');
var invoice = require('./routes/invoice');
var reports = require('./routes/reports');
var about = require('./routes/about');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/materials', materials);
app.use('/projects', projects);
app.use('/editProjects', editProjects);
app.use('/customers', customers);
app.use('/invoice', invoice);
app.use('/reports', reports);
app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.get('/submitted-material', function(req, res){
    var data = JSON.stringify(item, null, 4);
    fs.appendFileSync('./records/newFile.json', ",\n" + data);
    return res.send(req.query); 
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
