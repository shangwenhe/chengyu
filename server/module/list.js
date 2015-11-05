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
List.prototype.season = function (callback) {
    function random() {
        return parseInt(Math.random() * 24895);
    }
    var ids = [
        random(), random(), random(), 
        random(), random(), random()
    ];
    this.select('SELECT * FROM `CY_name` WHERE `id` in (' + ids.join(',') + ') ', callback);

}


emitter.on('sql:season', function (callback) {

    // 实例化一个列表功能
    var letterList = new List();
    letterList.connection();
    letterList.season(function () {
        callback && callback.apply(null, Array.prototype.slice.call(arguments, 0, 2));
        letterList.close();
    });

});

module.exports = List;
/* eslint-enable fecs-camelcase */
