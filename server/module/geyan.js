/**
 * @file: geyan.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-11-06 09:52
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/module/geyan.js start
/* eslint-disable fecs-camelcase */
var Module = require('./mysql');

// 创建Geyan对象
function Geyan() {}

// Geyan继承于Module
util.inherits(Geyan, Module);
Geyan.prototype.getDataByName = function (name, callback) {
    this.select('SELECT * FROM `CY_geyan` WHERE `parent`=\''+name+'\' limit 20',
        function () {
            callback.apply(null, Array.prototype.slice.call(arguments, 0, 2))
        });

};

emitter.on('sql:getDataByName', function (name, callback) {

    // 实例化一个列表功能
    var itemInfo = new Geyan();
    itemInfo.connection();
    itemInfo.getDataByName(name, function () {
        callback && callback.apply(null, Array.prototype.slice.call(arguments, 0));
        itemInfo.close();
        // 销毁实例
        itemInfo = undefined;
    });
});
emitter.on('sql:geyan', function (name, callback) {
    emitter.emit('sql:getDataByName', name || 200, callback);
});
/* eslint-enable fecs-camelcase */
