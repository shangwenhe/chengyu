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


Detail.prototype.updateViews = function (info, callback) {
    this.select('UPDATE `chengyu`.`CY_name` SET `views` = ' + (+info.curviews + 1) +
        ' WHERE `CY_name`.`relationId` =' + info.id, function (err, items, filed) {
            typeof callback === 'function' && callback(err, items, filed);
        });

}

Detail.prototype.getInfoById = function (id, callback) {
    var me = this;
    async.parallel([
        // 异步并行无依赖
        function (callback) {
            me.select('SELECT `name`,`indexName`,`views` FROM `CY_name` WHERE `relationId`=' + id,
                function () {
                    callback.apply(null, Array.prototype.slice.call(arguments, 0, 2))
                });
        },
        function (callback) {
            me.select('SELECT soundLetter,analysis,sample,fromto,synonyms,antonym,holding,id \
            FROM `CY_analysis` WHERE id=' + id,
                function () {
                    callback.apply(null, Array.prototype.slice.call(arguments, 0, 2))
                });
        }
    ], function (err, arg) {
        var result = [];
        var join = _.where(arg[0], {
            indexName: arg[1][0]['soundLetter']
        });
        var item = join[0];
        var info = arg[1][0];
        result.push({
            name: item.name,
            id: info.id,
            sound: info.soundLetter,
            analysis: info.analysis,
            sample: info.sample,
            fromto: info.fromto,
            synonyms: info.synonyms,
            antonym: info.antonym,
            holding: info.holding,
            views: item.views
        });

        // 更新views
        me.updateViews({
            curviews: item.views,
            id: id
        }, function () {
            callback && callback.call(null, err, result);
        });
    });
}


emitter.on('sql:getInfoById', function (id, callback) {
    // 实例化一个列表功能
    var itemInfo = new Detail();
    itemInfo.connection();
    itemInfo.getInfoById(id, function () {
        callback && callback.apply(null, Array.prototype.slice.call(arguments, 0));
        itemInfo.close();
        // 销毁实例
        itemInfo = undefined;
    });
});

emitter.on('sql:detail', function (id, callback) {
    emitter.emit('sql:getInfoById', !isNaN(id) ? id : 200, callback);
});
module.exports = Detail;
/* eslint-enable fecs-camelcase */
