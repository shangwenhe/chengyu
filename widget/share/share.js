/**
 * @file:
 * @FileName: share.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-08-16  19:35
 * @description: this is a new file
 */


// share/share.js start

var nativeShare = require('chengyu:widget/share/nativeShare/nativeShare.js');


module.exports = function (className) {
    $('.word-info').on('click', className, function () {
        var title = document.title;
        history.replaceState({},'','http://www.yiajie.com/?name=' + title);
        if (/Mobile/ig.test(navigator.userAgent)) {
            nativeShare('nativeShare', {
                url: 'http://www.yiajie.com/?name=' + title,
                title: title,
                desc: '最简单，最好玩，最好学',
                img: '',
                img_title: '',
                from: 'http://www.yiajie.com'
            });
            $('#nativeShare').show();
        } else {
            window._bd_share_config.common.dbUrl = window._bd_share_config.share.dbUrl = 'http://www.yiajie.com/?name=' + title;
            $('.bdsharebuttonbox').show();
        }
        $('.mod-share').show();
    });
    $('.mod-share').on('click', '.close-share', function () {

        $('.bdsharebuttonbox').hide();
        $('#nativeShare').hide();
        $('.mod-share').hide();
    });
};
