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
        var title = document.title.replace('-随手成语','');
        history.replaceState({},'','http://www.yiajie.com/?name=' + title);
        // if (/uc/ig.test(navigator.userAgent)) {
        //     nativeShare('nativeShare', {
        //         url: 'http://www.yiajie.com/?name=' + title,
        //         title: title,
        //         desc: '最简单，最好玩，最好学',
        //         img: '../../page/icon.png',
        //         img_title: title,
        //         from: 'http://www.yiajie.com'
        //     });
        //     $('#nativeShare').show();
        // } else {
            window._bd_share_config.common.bdUrl = window._bd_share_config.share.bdUrl = 'http://www.yiajie.com/?name=' + title;
            window._bd_share_config.common.bdText = window._bd_share_config.share.bdText = $('.detail-name').text()
            .replace(/\t/gm,'')
            .replace(/浏览\d*次/,'\t')
            .replace(/分享/,'')
            .replace(/^\s*(.*?)\s*$/mg,'$1');

            window._bd_share_config.common.summary = window._bd_share_config.share.summary = $('.detail-name').text();
            
            $('.bdsharebuttonbox').show();
        // }
        $('.mod-share').show();
    });
    $('.mod-share').on('click', '.close-share', function () {

        $('.bdsharebuttonbox').hide();
        $('#nativeShare').hide();
        $('.mod-share').hide();
    });
};
