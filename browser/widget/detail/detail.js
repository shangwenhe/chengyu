/**
 * @file:
 * @FileName: detail.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  17:04
 * @description: this is a new file
 * @require '../../static/lib/zepto/zepto.js'
 */
var $ = require('chengyu:components/jquery/jquery');
var _ = require('chengyu:components/underscore/underscore');
var search = require('chengyu:widget/search/search');
var detailHtml = __inline('./detail.tmpl');

// 随机产出一条数据
function getDataByRand(id,callback) {

    $.ajax({
        url: '/detail/'+id,
        data:{
            format:'json'
        },
        dataType: 'jsonp',
        success: function (data) {
            var data = data.data;
            if (!(data[0] && data[0].name)) {
                return;
            }
            document.title = data[0].name + '-随手成语';
            $('.word-info').html(detailHtml({
                data: data
            }));
            if (location.href.indexOf('id=') < 0) {
                history.replaceState({}, '', location.href + (location.href.indexOf('?') < 0 ? '?' : '&') + 'id=' + data[0].id);
            } else {
                history.replaceState({}, '', location.href.replace(/(id=)[^&]*/, '$1' + data[0].id));
            }
        },
        error: function (error) {
            callback && callback(true, error);
        }
    });
}

module.exports = function () {
    var dataList;
    var name = window.location.href.match(/name=([^&]*)/);

    $('.replace').on('click', function () {
        $('.search-value').val('');
        var id =  parseInt(Math.random() * 24000); 
        getDataByRand(id);
    });
    // search.sugg(getDataByName);
};
