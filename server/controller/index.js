/**
 * @file: index.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 19:11
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/index.js start
/* eslint-disable fecs-camelcase */

var List = require('../module/list');


emitter.on('render:index', function (params, callback) {
    //  绑定数据库查询事件
    emitter.once('sql:season', function (err, data) {
        console.log(data);
        typeof callback === 'function' && callback({
            title: '成语大全',
            data: data
        });
    });
    // 实例化一个列表功能
    var letterList = new List();
    letterList.connection();
    letterList.season();
    letterList.close();
});



require('./list');
require('./detail');
require('./recommend');
require('./search');

/* eslint-enable fecs-camelcase */
