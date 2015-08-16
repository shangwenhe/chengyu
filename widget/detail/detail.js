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
            document.title = data[0] && data[0].name || '成语大全';
            // typeof callback === 'function'  && callback(false, data);
            $('.word-info').html(detailHtml({
                data: data
            }));
        },
        error: function (error) {
            callback && callback(true, error);
        
        }
    });
}

// name查询一条数据
function getDataByName(name,callback){
    $.ajax({
        url: 'http://www.yiajie.com/get',
        data:{
            name: $.trim(name)
        },
        dataType: 'jsonp',
        success: function (data) {
            document.title = data[0] && data[0].name || '成语大全';
            
            // typeof callback === 'function'  && callback(false, data);
            $('.word-info').html(detailHtml({
                data: data
            }));
            history.replaceState({},'',location.href.replace(/name=[^&]*/,''));
        },
        error: function (error) {
            callback && callback(true, error);
        
        }
    });
}

module.exports = function () {
    var dataList;
    var name = window.location.href.match(/name=([^&]*)/);
    if(name && name[1]){
        getDataByName($.trim(name[1]))
    }else{
        getDataByRand(function(err, data){
            if(err){
                return ; 
            }
        });
    }
    $('.replace,.rand-word').on('click', function () {
        getDataByRand();
    });

    search.sugg(getDataByName);    
};
