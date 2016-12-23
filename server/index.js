/**
 * @file: index.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-29 06:07
 * @description: this is a <js> file
 */
/* globals __inline __uri */

/* eslint-disable fecs-camelcase */

//  配置文件
var conf = require('./conf/config');
// 注册全局变量

// 全局事件中心
var events = require('events');
global.emitter = new events.EventEmitter();
global.util = require('util');
global.async = require('async');
global._ = require('underscore');
global.fs = require('fs');

var path = require('path');

// module 模块
require('./module/mysql')
    // 控制器 -- 注册路由中的事件
require('./controller/index');
// 引入路由
var router = require('./router/index');

// express 设置
var express = require('express');
var app = express();
app.set('env', conf.env || 'pro');
app.set('port', conf.port || 3000);
app.set('views', path.join(__dirname, conf.views));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// 设置静态文件目录 
app.use(express.static(path.join(__dirname, conf.static)));

// 设置开发环境
// if ('development' == app.get('env')) {
//     app.use(express.errorHandler());
// }


app.use(function (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});



// 首页
app.get('/', router.index);
// 搜索接口
app.get('/search/:name', router.search);
// list列表页
app.get('/list/:id', router.list);
// 推荐入口
app.get('/recommend/', router.recommend);
// 详细内容
app.get('/detail/:id', router.detail);
// 格言
app.get('/geyan/:id', router.geyan);
// 取出指定个数的成语
app.get('/wordcount/:len', router.wordcount);

app.get('/taobao/:page', router.taobao);
app.post('/taobao/:page', router.taobao);

// 当以上所有路由都无法接入时进入下列路由中
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('chengyu/500');
});
app.use(function (req, res) {
    res.status(404).render('chengyu/404');
});


// 监听端口
var http = require('http');
var server = http.createServer(app);

// var https = require('https');
// var server = https.createServer({
//     key: fs.readFileSync(__dirname + '/ssl/yiajie.pem'),
//     cert: fs.readFileSync(__dirname + '/ssl/certificate.pem')
// }, app);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
server.on('connection', function () {
    console.log('connection');
});
server.on('closed', function () {
    console.log('exit');
});

/* eslint-enable fecs-camelcase */
