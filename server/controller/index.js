/**
 * @file: index.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 19:11
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/controller/index.js start
/* eslint-disable fecs-camelcase */


emitter.on('render:index', function (params, callback) {
    typeof callback==='function' && callback({title:'index'});
});


require('./list.js');
require('./page.js');
require('./recommend.js');
require('./search.js');

/* eslint-enable fecs-camelcase */
