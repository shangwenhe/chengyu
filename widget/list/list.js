/**
 * @file:
 * @FileName: list.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-15  22:16
 * @description: this is a new file
 */


// list/list.js start
var listTmpl = __inline('./list.tmpl');

function getlist(page) {
    $.ajax({
        url: 'http://www.yiajie.com/list',
        data: {
            page: 1
        },
        dataType: 'jsonp',
        success: function (data) {
            var list =  listTmpl({list:data});
            $('.mod-list').html(list);
        },
        error: function () {}
    })
}

module.exports = function () {
    getlist(1);
};
