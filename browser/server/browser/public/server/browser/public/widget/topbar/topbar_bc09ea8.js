define('chengyu:widget/topbar/topbar', function(require, exports, module) {

/**
 * @file:
 * @FileName: topbar.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-14  02:17
 * @description: this is a new file
 */


// topbar.js start

function topbar() {
    $(".mod-nav").on("click", function () {
        window.location.href = "http://www.yiajie.com/"
    })
}

module.exports = topbar;


});
