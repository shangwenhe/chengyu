define('chengyu:widget/header/header', function(require, exports, module) {

/********************************************
 *
 * 文件注释，说明文件名称和文件所包含内容
 * @file header.js
 * @author shangwenhe
 * @create time 2015年10月29日05:24
 * @version {版本信息}  v0.0.1
 *
 * ////////////////////////////////////////
 *
 * @describe define header function
 * @require 'chengyu:widget/header/header.less'
 * @return  {function}
 * @Modification time
 *
 *********************************************/


var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!--  header.tmpl -->\n<div class=\'header-tmpl\'>\n</div>\n\n\n\n';
}
return __p;
};


// header function 构造函数
function header() {

}


// header 原型扩展
header.prototype = {
    constructor: header
};

module.exports = exports.header = header;


});
