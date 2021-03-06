/**
 * @file: index.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-30 03:28
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/router/index.js start
/* eslint-disable fecs-camelcase */

function routerHook(router, req, res) {
    emitter.emit('render:' + router, {
        params: req.params,
        query: req.query,
        req: req,
        res: res
    }, function (data) {
        if (data.format === 'json') {
            var jsonData = JSON.stringify(data);
            if (!!data.callback) {
                jsonData = data.callback + '(' + jsonData + ')'
            }
            res.send(jsonData);
        } else {
            res.render('chengyu/' + router, data);
        }
    });
}



module.exports = {
    // 首页
    index: function (req, res) {
        res.type('.html');
        routerHook('index', req, res);
    },
    // 搜索接口
    search: function (req, res) {
        // req.params 路径中的参数
        // req.query 查询字符串
        routerHook('search', req, res);
    },
    // list列表页
    list: function (req, res) {
        routerHook('list', req, res);
    },

    // 详细内容
    detail: function (req, res) {
        routerHook('detail', req, res);
    },
    // 推荐入口
    recommend: function (req, res) {

    },
    // 格言
    geyan: function (req, res) {
        routerHook('geyan', req, res);
    },
    // 取出指定个数的成语
    wordcount: function (req, res) {
        routerHook('wordcount', req, res);
    },
    // 取出指定个数的成语
    taobao: function (req, res) {
        if(req.params.page === 'postdata'){
        console.log(req.body.id)
        }
        routerHook('taobao', req, res);
    }
};
/* eslint-enable fecs-camelcase */
