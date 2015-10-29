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
 * @require './header.less'
 * @return  {function}
 * @Modification time
 *
 *********************************************/


var tmpl = __inline('./header.tmpl');


// header function 构造函数
function header() {

}


// header 原型扩展
header.prototype = {
    constructor: header
};

module.exports = exports.header = header;
