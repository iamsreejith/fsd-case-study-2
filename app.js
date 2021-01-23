var createError = require('http-errors');
var express = require('express');
var path = require('path');
const dotenv = require("dotenv");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");

var fileUpload = require('express-fileUpload')

// Routes 
var userRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


app.use(expressEjsLayouts)
app.set('layout', './layouts/layout')
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    // console.log(con.connections);
    console.log('DB connected sucessfully');
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressEjsLayouts)
app.set('layout', './layouts/layout')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())



app.use('/', userRouter);
app.use('/admin', adminRouter);


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
