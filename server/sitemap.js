/**
 * @file: setmap.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-12-03 04:39
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/shangwenhe/github/chengyu/server/setmap.js start
/* eslint-disable fecs-camelcase */

var fs = require('fs');
var path = require('path');

var cTag = function (tag, con) {
    var tagOpen = '<' + tag + '>';
    var tagClose = '</' + tag + '>';
    return tagOpen + con + tagClose;
};

var group = function (arg) {
    var tags = ['loc', 'lastmod', 'changefreq', 'priority'];
    var url = ['<url>','<mobile:mobile type="pc,mobile"/>'];
    tags.forEach(function (item) {
        url.push(cTag(item, arg[item]));
    });
    url.push('</url>');
    return url.join('\n');
};

var groups = [];
for (var i = 1, len =  24896; i < len; i++) {
    groups.push(group({
        loc: 'http://www.yiajie.com/detail/'+i,
        lastmod: '2015-12-04',
        changefreq: 'monthly',
        priority: '0.9'
    }));
}



var xml = ['<?xml version="1.0" encoding="utf-8"?>',
        '<urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.baidu.com/schemas/sitemap-mobile/1/">',
        groups.join('\n'),
        '</urlset>'];
fs.writeFile(path.join(__dirname, '/browser/public/sitemap.xml'), xml.join('\n'), {
    encoding: 'utf-8'
}, function (err) {
    console.log( !err ? 'ready' : 'error')
});


/* eslint-enable fecs-camelcase */
