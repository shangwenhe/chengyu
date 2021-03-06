/**
 * @file: list.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 19:34
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/list.js start
/* eslint-disable fecs-camelcase */

emitter.on('render:list', function (params, callback) {
    emitter.emit('sql:getList', params.params.id, function (err, data, mk) {
        typeof callback === 'function' && callback({
            title: 'index',
            callback: params.query.callback || false,
            format: params.query.format || false,
            data: {
                list: data
            }
        });

    });
});

/* eslint-enable fecs-camelcase */
