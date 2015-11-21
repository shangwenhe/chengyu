/**
 * @file: search.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 21:36
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/module/search.js start
/* eslint-disable fecs-camelcase */

var Module = require('./mysql');

// 创建Search对象
function Search() {}

// Search继承于Module
util.inherits(Search, Module);
Search.prototype.searchByName = function (name, callback) {
    var sql = 'SELECT a.`id`,g.`name`,g.`views`, a.`soundLetter`, a.`analysis`, a.`sample` FROM `CY_analysis` as a,`CY_name` as g where a.`id`=g.`relationId` and g.`name`=\'' + name + '\' limit 20';
    this.select(sql, function () {
        callback.apply(null, Array.prototype.slice.call(arguments, 0, 2))
    });

};
Search.prototype.searchByLetter = function (key, callback) {
    var matchKey = 'name';
    var likeKey = key.replace(/(.)/g, '$1%');
    if (/^[a-z\s]*$/ig.test(key)) {
        matchKey = 'pinyin';
        key = key.replace(/ong|eng|ing|ang|ian|iao|an|au|ai|ia|ua|en|ei|ie|ue|in|iu|on|ou|uo|ui|un|a|e|i|o|u|v/ig, function (a, b, c) {
            return c.length === a.length + b ? a : a + '-';
        });
        likeKey = key + '%';
    }
    var sql = 'SELECT *  FROM `CY_name` WHERE `' + matchKey + '` LIKE \'' + likeKey + '\'  order by views DESC LIMIT 10';
    this.select(sql, function () {
        callback.apply(null, Array.prototype.slice.call(arguments, 0, 2))
    });
}

emitter.on('sql:searchByLetter', function (key, callback) {
    // 实例化一个列表功能
    var searchLetter = new Search();
    searchLetter.connection();
    searchLetter.searchByLetter(key, function () {
        callback && callback.apply(null, Array.prototype.slice.call(arguments, 0));
        searchLetter.close();
        // 销毁实例
        searchLetter = undefined;
    });

});

emitter.on('sql:searchByName', function (name, callback) {
    // 实例化一个列表功能
    var itemInfo = new Search();
    itemInfo.connection();
    itemInfo.searchByName(name, function () {
        callback && callback.apply(null, Array.prototype.slice.call(arguments, 0));
        itemInfo.close();
        // 销毁实例
        itemInfo = undefined;
    });
});
emitter.on('sql:search', function (name, callback) {
    emitter.emit('sql:searchByName', name || '暴殄天物', callback);
});

/* eslint-enable fecs-camelcase */
