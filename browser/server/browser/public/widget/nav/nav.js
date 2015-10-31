define('chengyu:widget/nav/nav', function(require, exports, module) {

/********************************************
 *
 * 文件注释，说明文件名称和文件所包含内容
 * @file nav.js
 * @author shangwenhe
 * @create time 2015年10月29日05:23
 * @version {版本信息}  v0.0.1
 *
 * ////////////////////////////////////////
 *
 * @describe define nav function
 * @require 'chengyu:widget/nav/nav.less'
 * @return  {function}
 * @Modification time
 *
 *********************************************/


var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!--  nav.tmpl -->\n<div class=\'nav-tmpl\'>\n</div>\n\n\n\n';
}
return __p;
};


// nav function 构造函数
function nav() {

}


// nav 原型扩展
nav.prototype = {
    constructor: nav
};

module.exports = exports.nav = nav;


});
