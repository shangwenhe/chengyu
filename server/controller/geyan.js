/**
 * @file: geyan.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-11-06 09:23
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/geyan.js start
/* eslint-disable fecs-camelcase */

var conf = {
    rensheng: '人生格言',
    dushu: '读书名言',
    lizhi: '励志名言',
    jingju: '名言警句'
}

_.forEach(conf, function (value, key) {
    emitter.on('geyan:' + key, function (params, callback) {
        emitter.emit('sql:geyan', value, function (err, data) {
            typeof callback === 'function' && callback({
                title: value,
                data: {
                    geyan: data
                },
                callback: params.query.callback || false,
                format: params.query.format || false
            });
        });
    });
});


emitter.on('render:geyan', function (params, callback) {


    switch (parseInt(params.params.id, 10)) {
    case 2:
        emitter.emit('geyan:dushu', params, callback);
        break;
    case 3:
        emitter.emit('geyan:jingju', params, callback);
        break;
    case 4:
        emitter.emit('geyan:lizhi', params, callback);
        break;
    default:
        emitter.emit('geyan:rensheng', params, callback);

    }
});

/* eslint-enable fecs-camelcase */
