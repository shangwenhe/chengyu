/**
 * @file: search.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 19:34
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/search.js start
/* eslint-disable fecs-camelcase */

emitter.on('render:search', function (params, callback) {
    params.params.name === 'name' && emitter.emit('sql:search',
        params.query.name, function (err, data, mk) {
            typeof callback === 'function' && callback({
                title: 'search:name',
                callback: params.query.callback || false,
                format: params.query.format || false,
                data: data
            });
        });
    params.params.name === 'letter' && emitter.emit('sql:searchByLetter',
        params.query.name, function (err, data, mk) {
            typeof callback === 'function' && callback({
                title: 'search:letter',
                callback: params.query.callback || false,
                format: params.query.format || false,
                data: data
            });
        });
});

/* eslint-enable fecs-camelcase */
