define('chengyu:widget/list/list', function(require, exports, module) {

/**
 * @file:
 * @FileName: list.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  22:16
 * @description: this is a new file
 */


// list/list.js start
var listTmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 $.each(list, function(index, item){ 
__p+='\n\t<li>\n\t\t<span>共浏览'+
((__t=(item.views))==null?'':__t)+
'次</span>\n\t\t<a href=\'./?name='+
((__t=(item.name))==null?'':__t)+
'\'>\n\t\t<i>'+
((__t=(item.indexName))==null?'':__t)+
'</i>\n\t\t'+
((__t=(item.name))==null?'':__t)+
'\n\t\t</a>\n\t</li>\n';
 }) 
__p+='\n';
}
return __p;
};

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
    getlist(getListParam);
};


});
