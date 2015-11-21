/**
 * @file:
 * @FileName: topbar.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  02:17
 * @description: this is a new file
 */

var $ = require('chengyu:components/jquery/jquery');
// topbar.js start

function topbar() {
    $(".mod-nav").on("click", function () {
        window.location.href = "/"
    })
}

module.exports = topbar;
