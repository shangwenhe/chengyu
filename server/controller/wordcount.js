/**
 * @file: wordcount.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-11-21 01:27
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/wordcount.js start
/* eslint-disable fecs-camelcase */

emitter.on('render:wordcount', function (params, callback) {
    
    emitter.emit('sql:wordcount', params.params.len, function (err, data, mk) {
        typeof callback === 'function' && callback({
            title: '零一二三四五六七八九十'.split('')[params.params.len] +'字成语',
            callback: params.query.callback || false,
            format: params.query.format || false,
            data: data
        });

    });
});
/* eslint-enable fecs-camelcase */
