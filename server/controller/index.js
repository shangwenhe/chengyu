/**
 * @file: index.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 19:11
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/index.js start
/* eslint-disable fecs-camelcase */

require('../module/list');
require('../module/detail');

// var arg = Array.prototype.slice.call(arguments, 0);

emitter.on('render:index', function (params, callback) {
    //  绑定数据库查询事件
    async.parallel([
        //  异步并行执行
        function (callback) {
            emitter.emit('sql:detail', params.query.id, callback);
        },
        function (callback) {
            emitter.emit('sql:season', callback);
        }
    ], function (err, arg) {
        typeof callback === 'function' && callback({
            title: arg[0][0] && arg[0][0]['name'] || '成语大全',
            data: arg[0],
            season: arg[1],
            callback: params.query.callback || false,
            format: params.query.format || false
        });
    });
});



require('./list');
require('./detail');
require('./recommend');

// 搜索结果
require('../module/search');
require('./search');

// 格言
require('../module/geyan');
require('./geyan');

// 取出指定个数的成语
require('../module/wordcount');
require('./wordcount');


/* eslint-enable fecs-camelcase */
