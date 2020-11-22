var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var rowRouter = require('./routes/rowRouter');
var usersRouter = require('./routes/users');
const cors = require('cors');

const mongoose = require('mongoose');

const Rows = require('./models/Rows');

const uri = "mongodb+srv://Dishant:dishantbisht@cluster0.srkc8.mongodb.net/CRUDtable?retryWrites=true&w=majority";

try {
  mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log("connected"));    
  }catch (error) { 
  console.log("could not connect");   
  }

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rows',rowRouter);

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
