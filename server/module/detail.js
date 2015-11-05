/**
 * @file: detail.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 21:36
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/module/detail.js start
/* eslint-disable fecs-camelcase */

var Module = require('./mysql');

// 创建Detail对象
function Detail() {}

// Detail继承于Module
util.inherits(Detail, Module);
Detail.prototype.getInfo = function (callback) {
    var len = 1;
    var me = this;
    var result  = [];
    me.select('SELECT * FROM `CY_name` \
    WHERE id >= (SELECT floor(RAND() * (SELECT MAX(id) FROM `CY_name`))) \
        ORDER BY id LIMIT ' + len, function (err, item) {
        var key = 0;

        // 从数据中取得关联数据的详细内容
        me.select('SELECT soundLetter,analysis,sample,fromto,synonyms,antonym,holding FROM `CY_analysis` WHERE id=' + item[key].relationId,
            function (err, info) {
                info = info[0];
                result.push({
                    name: item[key].name,
                    sound: info.soundLetter,
                    analysis: info.analysis,
                    sample: info.sample,
                    fromto: info.fromto,
                    synonyms: info.synonyms,
                    antonym: info.antonym,
                    holding: info.holding,
                    views: item[key].views
                });
                callback && callback.apply(null, [err, result]);
            });
    });

}
emitter.on('sql:detail', function (callback) {

    // 实例化一个列表功能
    var itemInfo = new Detail();
    itemInfo.connection();
    itemInfo.getInfo(function () {
        callback && callback.apply(null, Array.prototype.slice.call(arguments, 0));
        itemInfo.close();
    });
});
module.exports = Detail;
/* eslint-enable fecs-camelcase */
