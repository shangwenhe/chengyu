/**
 * @file: mysql.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 17:43
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/module/mysql.js start
/* eslint-disable fecs-camelcase */

// 引入mysql类库 
var mysql = require('mysql');

// 配置文件
var conf = require('../conf/config.js');



// 创建基础类
function Module() {}

// 数据库链接
Module.prototype.connection = function (callback) {
    var me = this;
    this.connect = mysql.createConnection(conf.mysql);
    this.connect.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        callback && callback(me.connect);
    });
};
// 数据库关闭
Module.prototype.close = function (callback) {
    this.connect && this.connect.end(callback);
};
// 数据查询
Module.prototype.query = function (query, callback) {
    this.connect.query(query, callback);
    this.close();
};
// 数据插入
Module.prototype.insert = function () {
    return 'insert';
};
// 数据选择
Module.prototype.select = function () {
    return 'select';
};
// 数据删除
Module.prototype.drop = function () {};
// error
Module.prototype.error = function () {};

module.exports = Module;
/* eslint-enable fecs-camelcase */
