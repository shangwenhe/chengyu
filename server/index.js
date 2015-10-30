/**
 * @file: index.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-29 06:07
 * @description: this is a <js> file
 */
/* globals __inline __uri */

/* eslint-disable fecs-camelcase */

var conf = require('./conf/config.js');


var express = require('express');
var router = require('./router/index.js');
var http = require('http');
var path = require('path');

// express 设置
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
app.get('/page/:id', router.page);




// 监听端口
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

/* eslint-enable fecs-camelcase */
