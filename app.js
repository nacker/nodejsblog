"use strict";

var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var config = require('./config');


var app = express();

// 配置静态文件服务中间件
app.use('/www',express.static('www'));
app.use('/uploads',express.static('uploads'));

// 挂载cookie中间件
app.use(cookieParser());

// 挂载Session中间件
app.use(session({
  secret: config.secret, // 每一次生成Cookie的值的时候，1 2 3 4 5 6，通过一个私钥生成一个随机字符串再交给客户端
  resave: false,
  saveUninitialized: true
}));

// 配置解析post请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
// 配置模板引擎,使用xtpl模板引擎，但是这个模板引擎是基于xtemplate的，所以要同时安装xtemplate和xtpl
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'xtpl');

app.locals.config = config;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 加载路由中间件
app.use(require('./router'));

// 开发环境错误处理中间件
if(config.debug){
  app.use(function (err, req, res, next) {
    res.send('糟了，服务器玩儿崩溃了'+err.message);
  });
}

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
