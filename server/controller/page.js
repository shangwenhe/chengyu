/**
 * @file: page.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 19:34
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/page.js start
/* eslint-disable fecs-camelcase */

emitter.on('render:page', function (params, callback) {
    typeof callback==='function' && callback({title:'index'});
});

/* eslint-enable fecs-camelcase */
