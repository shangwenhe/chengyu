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
var http = require('http');
var path = require('path');

var app =  express();
app.set('port', conf.port || 3000);
app.set('views', path.join(__dirname, conf.views));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
// app.use(express.urlencoded());
// app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, conf.static)));

/* eslint-enable fecs-camelcase */
