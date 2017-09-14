var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var campaign = require('./routes/campaign');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//users里面的接口，不做登录拦截，所以放在拦截之前进行注册
app.use('/api/users', users);
//登录拦截
//app.use(function (req, res, next) {
//  var url = req.originalUrl;
//  if (!req.session) {
//    res.status(401).send('you are not login!');
//    return;
//  }
//  next();
//});
app.use('/', index);
app.use('/api/campaign', campaign);
var signIn = require('./routes/signIn');
app.use('/api/signIn', signIn);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
// 错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
