require('./DbConnection/db');

const formController = require("./Controllers/FormController/formController");
const signUpctrl = require("./Controllers/AuthControllers/signupController");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Then use it before your routes are set up:
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/Control',express.static(path.join(__dirname, '/Controllers/FormController/tempFile')));
app.use(express.static(path.join(__dirname, '/Controllers/FormController/')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', formController);
app.use('/auth', signUpctrl);

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


