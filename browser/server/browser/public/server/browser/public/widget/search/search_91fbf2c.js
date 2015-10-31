define('chengyu:widget/search/search', function(require, exports, module) {

/**
 * @file:
 * @FileName: search.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  18:46
 * @description: this is a new file
 */


// widget/search/search.js start

var sugglistTmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 $.each(sug, function(index, item){ 
__p+='\n        <li>\n\t\t\t<span>'+
((__t=( item.views))==null?'':__t)+
'人查看</span>\n            <a href=\'http://www.yiajie.com/?name='+
((__t=(item.name))==null?'':__t)+
'\'>'+
((__t=( item.name ))==null?'':__t)+
'</a> \n        </li>\n';
 }) 
__p+='\n';
}
return __p;
};


function getSugg(key) {
    $.ajax({
        url: 'http://www.yiajie.com/search',
        data: {
            k: $.trim(key)
        },
        dataType: 'jsonp',
        success: function (sugglist) {
            var list = sugglistTmpl({
                sug: sugglist
            });
            $('.sugge').show().html(list);
        },
        error: function () {

        }

    })
}


var leftValue = '95px';
var modSearch = $('.mod-search');
var t ;
module.exports = {
    init: function () {
        $('.search-value').on('keyup', function (e) {
            var value = $(this).val();
            if (e.keyCode === 13) {} else {
                getSugg(value);
            }
        }).on('focus', function () {
            clearTimeout(t);
            modSearch.css('left', '10px');
        }).on('blur', function () {
            t = setTimeout(function () {
                modSearch.css('left', leftValue);
                $('.sugge').hide();
            }, 4000);
        });
    },
    sugg: function (getDataByName) {
        $('.sugge').on('click', 'a', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var value = $(this).text();
            $('.search-value').val(value);
            getDataByName(value);
            $(this).parents('.sugge').hide();
            modSearch.css('left', leftValue);

        });
    }
};


});
