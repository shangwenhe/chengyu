/**
 * @file:
 * @FileName: detail.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  17:04
 * @description: this is a new file
 * @require '../../static/lib/zepto/zepto.js'
 */

var search = require('chengyu:widget/search/search');
var detailHtml = __inline('./detail.tmpl');
var _ = {
    escape: function (str) {
        var html = str.replace(/&lt;|&gt;/ig, function (e) {
            var keys = {
                '&gt;': '>',
                '&lt;': '<'
            };
            return keys[e];
        })
        return html;
    }
};

// 随机产出一条数据
function getDataByRand(callback) {
    $.ajax({
        url: 'http://www.yiajie.com/rand',
        dataType: 'jsonp',
        success: function (data) {
            if (!(data[0] && data[0].name)) {
                return;
            }
            document.title = data[0].name + '-随手成语';
            // typeof callback === 'function'  && callback(false, data);
            $('.word-info').html(detailHtml({
                data: data
            }));
            if (location.href.indexOf('name=') < 0) {
                history.replaceState({}, '', location.href + (location.href.indexOf('?') < 0 ? '?' : '&') + 'name=' + data[0].name);
            } else {
                history.replaceState({}, '', location.href.replace(/(name=)[^&]*/, '$1' + data[0].name));
            }
        },
        error: function (error) {
            callback && callback(true, error);
        }
    });
}

// name查询一条数据
function getDataByName(name, callback) {
    $.ajax({
        url: 'http://www.yiajie.com/get',
        data: {
            name: $.trim(name)
        },
        dataType: 'jsonp',
        success: function (data) {
            // 当失败的时候走到随机
            if (data[0] && data[0].error) {
                getDataByRand();
                return;
            }
            document.title = data[0].name + '-随手成语';
            $('.word-info').html(detailHtml({
                data: data
            }));

            history.replaceState({}, '', location.href.replace(/(name=)[^&]*/, '$1' + data[0].name));
        },
        error: function (error) {
            callback && callback(true, error);

        }
    });
}

module.exports = function () {
    var dataList;
    var name = window.location.href.match(/name=([^&]*)/);

    $('.replace,.rand-word').on('click', function () {
        getDataByRand();
    });
    search.sugg(getDataByName);
    // if (name && name[1] ) {
    //     try{
    //         var nameUri = decodeURIComponent(name[1]);
    //         if(/[\u4e00-\u9fa5]/.test(nameUri)){
    //             getDataByName($.trim(nameUri));
    //             return;
    //         }
    //     }catch(e){ }
    // }   
    // getDataByRand();
};
