/**
 * @file: list.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 21:36
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/module/list.js start
/* eslint-disable fecs-camelcase */

var Module = require('./mysql');


// 创建List对象
function List() {}

// List继承于Module
util.inherits(List, Module);
List.prototype.select = function (sql, emitEvent) {
    this.connect.query(sql, function () {
        // 序列化参数列表
        var arg = Array.prototype.slice.call(arguments, 0);
        arg.unshift(emitEvent);
        // apply给回调添加参数
        emitter.emit.apply(emitter, arg);
    });
}
List.prototype.season = function () {
    function random() {
        return parseInt(Math.random() * 24895);
    }
    var ids = [
        random(), random(), random(), random(),
        random(), random(), random(), random(),
        random(), random(), random(), random(),
        random(), random(), random(), random(),
    ];
    this.select('SELECT * FROM `CY_name` WHERE `id` in (' + ids.join(',') + ') ', 'sql:season');

}

module.exports = List;
/* eslint-enable fecs-camelcase */
