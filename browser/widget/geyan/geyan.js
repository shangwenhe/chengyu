/********************************************
 *
 * 文件注释，说明文件名称和文件所包含内容
 * @file geyan.js
 * @author shangwenhe
 * @create time 2015年11月20日06:39
 * @version {版本信息}  v0.0.1
 *
 * ////////////////////////////////////////
 *
 * @describe define geyan function
 * @require './geyan.less'
 * @return  {function}
 * @Modification time
 *
 *********************************************/


var $ = require('chengyu:components/jquery/jquery');
var Event = require('chengyu:static/Event/Event');
var _ = require('chengyu:components/underscore/underscore');
var tmpl = __inline('./geyan.tmpl');

Event.on('geyan:getCatlist', function (cat) {

    // 取得数据
    $.ajax({
        url: '/geyan/' + cat,
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        success: function (data) {
            $('.geyan').html(tmpl(data));
        },
        error: function () {}
    });
});

$('.geyan').on('click', '.sub-nav a', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var cat = /^\/geyan\/(\d+)$/.exec(href);
        Event.trigger('geyan:getCatlist',cat[1]) ;
        });
