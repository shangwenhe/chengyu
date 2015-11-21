/**
 * @file:
 * @FileName: list.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  22:16
 * @description: this is a new file
 */


var $ = require('chengyu:components/jquery/jquery');
var _ = require('chengyu:components/underscore/underscore');
// list/list.js start
var listTmpl = __inline('./list.tmpl');

function getlist(param) {
    $.ajax({
        url: 'http://www.yiajie.com/list',
        data: param,
        dataType: 'jsonp',
        success: function (data) {
            var list = listTmpl({
                list: data
            });
            $('.mod-list').html(list);
        },
        error: function () {}
    })
}

module.exports = function () {
    var getListParam ={page:1};
    if(/wl=\d*/.test(window.location.href)){
        getListParam.wl = window.location.href.replace(/^.*wl=(\d*).*$/,'$1');
    }
    if(/page=\d*/.test(window.location.href)){
        getListParam.page = window.location.href.replace(/^.*page=(\d*).*$/,'$1')
    }
    //  getlist(getListParam);
};
