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
var Module = Object.create({
    // 数据库链接
    connection: function (callback) {
        var me = this;
        this.connection = mysql.createConnection(conf.mysql);
        this.connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
            }
            callback && callback(me.connection);
        });
    },
    // 数据库关闭
    colse: function (connection, callback) {
        if (typeof connection !== 'function') {
            connection && connection.end(callback);
        } else {
            // 向前传递一下参数
            var callback = connection;
            this.connection && this.connection.end(callback);
        }
    },
    // 数据查询
    query: function (query, callback) {
        this.connection.query(query, callback);
        this.close();
    },
    // 数据插入
    insert: function () {},
    // 数据选择
    select: function () {},
    // 数据删除
    drop: function () {},
    // error
    error: function () {}
});


module.exports = Module;
/* eslint-enable fecs-camelcase */
