/**
 * @file: wordcount.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-11-21 01:38
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/module/wordcount.js start
/* eslint-disable fecs-camelcase */

var Module = require('./mysql');

// 出指定个数的成语
function WordCount() {}

// List继承于Module
util.inherits(WordCount, Module);

WordCount.prototype.count = function (len, callback) {
    var wlArr = [];
    for (var i = 0; i < len; i++) {
        wlArr.push('_');
    }
    var desc = wlArr.length > 5 ? 'DESC' : '';
    var sql = 'SELECT * FROM `CY_name` WHERE name LIKE \'' + wlArr.join('') + '\' ORDER BY views ' + desc + ' LIMIT 30';
    this.select(sql, function () {
        callback.apply(null, Array.prototype.slice.call(arguments, 0, 2))
    });
}
emitter.on('sql:wordcount', function (len, callback) {
    console.log(len);
    var count = new WordCount();
    count.connection();
    count.count(len, function () {
        callback && callback.apply(null, Array.prototype.slice.call(arguments, 0, 2));
        count.close();
    });
});

/* eslint-enable fecs-camelcase */
