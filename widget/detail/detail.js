/**
 * @file:
 * @FileName: detail.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  17:04
 * @description: this is a new file
 * @require '../../static/lib/zepto/zepto.js'
 */


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

function getData(callback) {
    $.ajax({
        url: 'http://node.baidu.com/rand',
        dataType: 'jsonp',
        success: function (data) {
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

module.exports = function () {
    var dataList;
    getData(function(err, data){
        if(err){
            return ; 
        }
    });
    $('.replace,.rand-word').on('click', function () {
        getData();
    });
};
