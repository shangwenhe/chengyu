/**
 * @file: list.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 19:34
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/list.js start
/* eslint-disable fecs-camelcase */

emitter.on('render:taobao', function (params, callback) {
    emitter.emit('sql:taobaoList', params.params.page, function (err, data) {
        typeof callback === 'function' && callback({
            title: 'taobao',
            callback: params.query.callback || false,
            pagetype: params.params.page,
            format: params.query.format || false,
            data: {
                list: data
            }
        });

    });
});

/* eslint-enable fecs-camelcase */
