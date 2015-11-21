/**
 * @file:
 * @FileName: search.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  18:46
 * @description: this is a new file
 */


// widget/search/search.js start
var $ = require('chengyu:components/jquery/jquery');
var sugglistTmpl = __inline('./search.tmpl');


function getSugg(key) {
    $.ajax({
        url: '/search/letter',
        data: {
            name: $.trim(key),
            format: 'json'
        },
        dataType: 'jsonp',
        success: function (sugglist) {
            var list = sugglistTmpl({
                sug: sugglist.data
            });
            $('.sugge').show().html(list);
        },
        error: function () {

        }

    })
}


var leftValue = '95px';
var modSearch = $('.mod-search');
var t;
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
