/**
 * @file: index.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 03:28
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/router/index.js start
/* eslint-disable fecs-camelcase */

module.exports = {
    // 首页
    index: function (req, res) {
        res.type('.html');
        res.render('index', {
            title: 'Index'
        });
    },
    // 搜索接口
    search: function (req, res) {

    },
    // list列表页
    list: function (req, res) {

    },
    // 详细内容
    page: function (req, res) {

    },
    // 推荐入口
    recommend: function (req, res) {

    }
};
/* eslint-enable fecs-camelcase */
