define('chengyu:widget/detail/detail', function(require, exports, module) {

/**
 * @file:
 * @FileName: detail.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  17:04
 * @description: this is a new file
 * @require '../../static/lib/zepto/zepto.js'
 */

var search = require('chengyu:widget/search/search');
var detailHtml = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="detail">\n\t';
 $.each(data,function(index, item){  
__p+='\n\t\t<article class=\'detail-info\'>\n\t\t\t<div class="detail-name">\n\t\t\t<h2>'+
((__t=( item.name))==null?'':__t)+
'<i>浏览'+
((__t=(item.views))==null?'':__t)+
'次</i><span> '+
((__t=( item.sound))==null?'':__t)+
'\t</span></h2>\n\t\t\t<p class=\'analysis\'>解析：'+
((__t=( item.analysis))==null?'':__t)+
'\t</p>\n\t\t\t<span class=\'share\'>分享</a>\n\t\t\t</div>\n\t\t\t';
 if(item.fromto){ 
__p+='\n\t\t\t<div class=\'fromto\'><div>出处</div><p>'+
((__t=( item.fromto))==null?'':__t)+
'</p></div>\n\t\t\t';
 } 
__p+='\n\t\t\t';
 if(item.sample){ 
__p+='\n\t\t\t<div class=\'sample\'><div>举例说明</div><p>'+
((__t=(
			item.sample))==null?'':_.escape(__t))+
'</p></div>\n\t\t\t';
 } 
__p+='\n\t\t</article>\n\t';
 }) 
__p+='\n</div>\n';
}
return __p;
};
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
        $('.search-value').val('');
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


});
