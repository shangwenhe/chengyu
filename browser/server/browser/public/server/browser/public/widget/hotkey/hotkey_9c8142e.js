define('chengyu:widget/hotkey/hotkey', function(require, exports, module) {

/********************************************
 *
 * 文件注释，说明文件名称和文件所包含内容
 * @file hotkey.js
 * @author shangwenhe
 * @create time 2015年10月29日05:29
 * @version {版本信息}  v0.0.1
 *
 * ////////////////////////////////////////
 *
 * @describe define hotkey function
 * @require 'chengyu:widget/hotkey/hotkey.less'
 * @return  {function}
 * @Modification time
 *
 *********************************************/


var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!--  hotkey.tmpl -->\n<div class=\'hotkey-tmpl\'>\n</div>\n\n\n\n';
}
return __p;
};


// hotkey function 构造函数
function hotkey() {

}


// hotkey 原型扩展
hotkey.prototype = {
    constructor: hotkey
};

module.exports = exports.hotkey = hotkey;


});
