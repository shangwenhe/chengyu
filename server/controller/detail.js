/**
 * @file: detail.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 19:34
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/detail.js start
/* eslint-disable fecs-camelcase */

emitter.on('render:detail', function (params, callback) {
    emitter.emit('sql:getInfoById', params.params.id, function (err, data, mk) {
        typeof callback === 'function' && callback({
            title: data[0] && data[0]['name'] || '成语大全',
            callback: params.query.callback || false,
            format: params.query.format || false,
            data:data
        });

    });
});

/* eslint-enable fecs-camelcase */
