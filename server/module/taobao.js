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
List.prototype.admin = function (callback) {
    // this.select('SELECT * FROM `CY_name` WHERE `id` in (' + ids.join(',') + ') ', callback);

    var insertmysql = "INSERT INTO `chengyu`.`CY_taobao` \
                        (`image`, `describe`, `name`, `title`, `sort`, `marks`) \
                        VALUES \
                        ('123/456/789/10', 'describe 123456', 'name 123456', 'title 123456', '0', NULL)";

    callback(null, {})
}
List.prototype.getList = function (callback) {
    this.select('SELECT `id`,`name`,`alias`,`image`,`describe`,`marks`,`sort`,`date`  FROM `CY_taobao` limit 20', callback);
}


emitter.on('sql:taobaoList', function (page, callback) {
    // 实例化一个列表功能

    var letterList = new List();
    letterList.connection();

    switch(page){
        case 'admin':
            callback.call(null,null,'adminpage');
            break;
        case 'postdata':
            letterList.admin(function () {
                callback && callback.apply(null, Array.prototype.slice.call(arguments, 0, 2));
                letterList.close();
            });
            break;
        default:
            letterList.getList(function () {
                callback && callback.apply(null, Array.prototype.slice.call(arguments, 0, 2));
                letterList.close();
            });
    
    }
});
/* eslint-enable fecs-camelcase */
