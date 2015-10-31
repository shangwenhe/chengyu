define('chengyu:static/statistics/statistics', function(require, exports, module) {

/**
 * Created by hejie on 14-7-12.
 */
!(function(w){
        T = $;
    //cookie
    $.extend({
        cookie:{
            _isValidKey : function (key) {
                // http://www.w3.org/Protocols/rfc2109/rfc2109
                // Syntax:  General
                // The two state management headers, Set-Cookie and Cookie, have common
                // syntactic properties involving attribute-value pairs.  The following
                // grammar uses the notation, and tokens DIGIT (decimal digits) and
                // token (informally, a sequence of non-special, non-white space
                // characters) from the HTTP/1.1 specification [RFC 2068] to describe
                // their syntax.
                // av-pairs   = av-pair *(";" av-pair)
                // av-pair    = attr ["=" value] ; optional value
                // attr       = token
                // value      = word
                // word       = token | quoted-string

                // http://www.ietf.org/rfc/rfc2068.txt
                // token      = 1*<any CHAR except CTLs or tspecials>
                // CHAR       = <any US-ASCII character (octets 0 - 127)>
                // CTL        = <any US-ASCII control character
                //              (octets 0 - 31) and DEL (127)>
                // tspecials  = "(" | ")" | "<" | ">" | "@"
                //              | "," | ";" | ":" | "\" | <">
                //              | "/" | "[" | "]" | "?" | "="
                //              | "{" | "}" | SP | HT
                // SP         = <US-ASCII SP, space (32)>
                // HT         = <US-ASCII HT, horizontal-tab (9)>

                return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
            },
            getRaw : function (key) {
                if ($.cookie._isValidKey(key)) {
                    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                        result = reg.exec(document.cookie);

                    if (result) {
                        return result[2] || null;
                    }
                }

                return null;
            },
            get : function (key) {
                var value = T.cookie.getRaw(key);
                if ('string' == typeof value) {
                    value = decodeURIComponent(value);
                    return value;
                }
                return null;
            },
            setRaw : function (key, value, options) {
                if (!$.cookie._isValidKey(key)) {
                    return;
                }

                options = options || {};
                //options.path = options.path || "/"; // meizz 20100402 设定一个初始值，方便后续的操作
                //berg 20100409 去掉，因为用户希望默认的path是当前路径，这样和浏览器对cookie的定义也是一致的

                // 计算cookie过期时间
                var expires = options.expires;
                if ('number' == typeof options.expires) {
                    expires = new Date();
                    expires.setTime(expires.getTime() + options.expires);
                }

                document.cookie =
                    key + "=" + value
                        + (options.path ? "; path=" + options.path : "")
                        + (expires ? "; expires=" + expires.toGMTString() : "")
                        + (options.domain ? "; domain=" + options.domain : "")
                        + (options.secure ? "; secure" : '');
            },
            remove : function (key, options) {
                options = options || {};
                options.expires = new Date(0);
                T.cookie.setRaw(key, '', options);
            },
            set : function (key, value, options) {
                T.cookie.setRaw(key, encodeURIComponent(value), options);
            }
        }
    });
    //type
    $.extend({
        "typeof" : (function() {
            var objectType = {},result = {},
                nodeType = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
                str = "Array Boolean Date Error Function Number RegExp String",
                retryType = {'object': 1, 'function': '1'},//解决safari对于childNodes算为function的问题
                toString = objectType.toString;

            // 给 objectType 集合赋值，建立映射
            $.each(str.split(" "), function(idx,name) {
                objectType[ "[object " + name + "]" ] = name.toLowerCase();
                result[ "is" + name ] = function ( unknow ) {
                    return $["typeof"](unknow) == name.toLowerCase();
                }
            });
            $.extend(result);
            // 方法主体
            return function ( unknow ) {
                var s = typeof unknow;
                return !retryType[s] ? s
                    : unknow == null ? "null"
                    : unknow._type_
                    || objectType[ toString.call( unknow ) ]
                    || nodeType[ unknow.nodeType ]
                    || ( unknow == unknow.window ? "Window" : "" )
                    || "object";
            };
        })()
    });
    $.extend({
        string:{
            escapeReg : function (s) {
                return s.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
            },
            widthstr : function(s, count) {
                if (!s) return s;
                var num = count*2, index = 0, i = 0;
                for (var len = s.length; i<len; i++) {
                    var step = (s.charCodeAt(i)>0 && s.charCodeAt(i)<255) ? 1 : 2;
                    if (index+step>num) {
                        break;
                    }
                    index += step;
                }
                return (s.substr(0, i)+((i==len)?'':'..'));
            }
        }
    });
    //url
    $.extend({
        url:{
            getQueryValue : function (url, key) {
                var reg = new RegExp(
                    "(^|&|\\?|#)"
                        + $.string.escapeReg(key)
                        + "=([^&#]*)(&|\x24|#)",
                    "");
                var match = url.match(reg);
                if (match) {
                    return match[2];
                }
                return null;
            },
            jsonToQuery : function (json, replacer_opt) {
                var result = [],
                    itemLen,
                    replacer = replacer_opt || function (value) {
                        return $.url.escapeSymbol(value);
                    };

                $.each(json, function(key,item){
                    // 这里只考虑item为数组、字符串、数字类型，不考虑嵌套的object
                    if ($.isArray(item)) {
                        itemLen = item.length;
                        // value的值需要encodeURIComponent转义吗？
                        // FIXED 优化了escapeSymbol函数
                        while (itemLen--) {
                            result.push(key + '=' + replacer(item[itemLen], key));
                        }
                    } else {
                        result.push(key + '=' + replacer(item, key));
                    }
                });

                return result.join('&');
            },
            queryToJson : function(url){
                var params = url.substr(url.lastIndexOf('?') + 1).split('&'),
                    len = params.length,
                    ret = null, entry, key, val;
                for(var i = 0; i < len; i++){
                    entry = params[i].split('=');
                    if(entry.length < 2){continue;}
                    !ret && (ret = {});
                    key = entry[0];
                    val = entry[1];
                    entry = ret[key];
                    if(!entry){
                        ret[key] = val;
                    }else if($.isArray(entry)){
                        entry.push(val);
                    }else{// 这里只可能是string了
                        ret[key] = [entry, val];
                    }
                }
                return ret;
            },
            escapeSymbol : function(source) {
                //发现在ie下无法匹配中文全角空格和纵向指标符\v，所以改\s为\f\r\n\t\v以及中文全角空格和英文空格
                //但是由于ie本身不支持纵向指标符\v,故去掉对其的匹配，保证各浏览器下效果一致
                return String(source).replace(/[#%&\+=\/\\\s\u3000\f\r\n\t]/g, function(txt){
                    txt = txt.charCodeAt();
                    return txt === 0x3000 ? '%E3%80%80' : '%' + (0x100 + txt).toString(16).substring(1).toUpperCase();
                });
            }
        }
    });
    //log
    $.extend({
        log : function(url) {
            var url = url||'';
            var img = new Image(),
                key = '_log_' + Math.floor(Math.random() *
                    2147483648).toString(36);

            // 这里一定要挂在window下
            // 在IE中，如果没挂在window下，这个img变量又正好被GC的话，img的请求会abort
            // 导致服务器收不到日志
            window[key] = img;

            img.onload = img.onerror = img.onabort = function() {
                // 下面这句非常重要
                // 如果这个img很不幸正好加载了一个存在的资源，又是个gif动画
                // 则在gif动画播放过程中，img会多次触发onload
                // 因此一定要清空
                img.onload = img.onerror = img.onabort = null;

                window[key] = null;

                // 下面这句非常重要
                // new Image创建的是DOM，DOM的事件中形成闭包环引用DOM是典型的内存泄露
                // 因此这里一定要置为null
                img = null;
            };

            // 一定要在注册了事件之后再设置src
            // 不然如果图片是读缓存的话，会错过事件处理
            // 最后，对于url最好是添加客户端时间来防止缓存
            // 同时服务器也配合一下传递Cache-Control: no-cache;
            img.src = url;
        }
    });
    //format
    $.extend({
        stringFormat : function (src,opts) {
            var source = src,
                data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
            if(data.length){
                data = data.length == 1 ?
                    (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data)
                    : data;
                return source.replace(/#\{(.+?)\}/g, function (match, key){
                    var replacer = data[key];
                    // chrome 下 typeof /a/ == 'function'
                    if('[object Function]' == toString.call(replacer)){
                        replacer = replacer(key);
                    }
                    return ('undefined' == typeof replacer ? '' : replacer);
                });
            }
            return source;
        },
        dateFormat:function(source,pattern){
            if ('string' != typeof pattern) {
                return source.toString();
            }

            function replacer(patternPart, result) {
                pattern = pattern.replace(patternPart, result);
            }

            var pad     = $.numberPad,
                year    = source.getFullYear(),
                month   = source.getMonth() + 1,
                date2   = source.getDate(),
                hours   = source.getHours(),
                minutes = source.getMinutes(),
                seconds = source.getSeconds();

            replacer(/yyyy/g, pad(year, 4));
            replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
            replacer(/MM/g, pad(month, 2));
            replacer(/M/g, month);
            replacer(/dd/g, pad(date2, 2));
            replacer(/d/g, date2);

            replacer(/HH/g, pad(hours, 2));
            replacer(/H/g, hours);
            replacer(/hh/g, pad(hours % 12, 2));
            replacer(/h/g, hours % 12);
            replacer(/mm/g, pad(minutes, 2));
            replacer(/m/g, minutes);
            replacer(/ss/g, pad(seconds, 2));
            replacer(/s/g, seconds);

            return pattern;
        },
        numberPad:function(source,length){
            var pre = "",
                negative = (source < 0),
                string = String(Math.abs(source));

            if (string.length < length) {
                pre = (new Array(length - string.length + 1)).join('0');
            }
            return (negative ?  "-" : "") + pre + string;
        }
    })
	//增加cacheScript方法，getScript会自动加时间戳，不利于缓存
	$.extend({
		cacheScript : function (url, options){
			var options = $.extend(options || {},{
				dataType :	"script",
				cache	 :	true,
				url		 :	url
			});
			return $.ajax(options);
		}
	});
    //设为全局变量
    w.$ = w.jQuery = $;
})(window);

/**
 * @file 统计
 * @author fe
 */

/* global PAGE_DOM_READY_TIME */

var T = $;

var win = window;
var V = win.V = (function () {
    var cache = {};

    return {
        cache: {
            set: function (key, value) {
                return cache[key] = value;
            },

            remove: function (key) {
                delete cache[key];
            },

            get: function (key) {
                return cache[key];
            }
        }
    };
})();

var vConf = {
    logImgSrc: 'http://nsclick.baidu.com/v.gif',
    logParams: {
        pid: 104
    }
};

var paramToString = function (params) {
    var ret = '';
    for (var key in params) { // pid放在第一位
        if (params.hasOwnProperty(key) && typeof params[key] !== 'function' && key !== 'pid') {
            ret += '&' + key + '='
                + encodeURIComponent(decodeURIComponent(params[key]));
        }
    }

    return (params.pid ? 'pid=' + params.pid : '') + ret;
};

vConf.logParams.toString = function () {
    if (typeof this === 'string') {
        return this;
    }

    var params = this;

    return paramToString(params);
};

// private vars
var dataCache = {};
var pending = {};

// 统计相关配置
var config = {
    // 去重方式，0: 不去重 1: 局部 > 全局 2: 全局 > 局部
    // 为兼容已有逻辑，默认值设为0
    dedup: 0
};

// private function
function getModule(name) {
    var nameArr = name.split('.');
    var mod = nameArr[0];

    name = name.replace(mod, '').replace(/^\.*/, '');

    return {
        name: name,
        mod: mod
    };
}

// extend vui
V.addEventListener = function (name, func) {
    var moduld = getModule(name);
    var name = moduld.name;
    var mod = moduld.mod;
    var arg = [].slice.call(arguments, 1);

    dataCache[mod] = dataCache[mod] ? dataCache[mod] : {};
    dataCache[mod][name] = dataCache[mod][name] ? dataCache[mod][name] : [];

    dataCache[mod][name].push(func);

    if (pending[mod] && pending[mod][name]) {
        func.apply(this, pending[mod][name]);
        // free pending event
        delete pending[mod][name];
    }
};

V.dispatch = function (name) {
    var module = getModule(name);
    var name = module.name;
    var mod = module.mod;
    var arg = [].slice.call(arguments, 1);

    // excute event handle
    if (dataCache[mod] && dataCache[mod][name] && dataCache[mod][name].length > 0) {
        // forEach excute event's factory
        T.each(dataCache[mod][name], function (idx, item) {
            item.apply(this, arg);
        });
        return;
    }

    // pending event agvs
    pending[mod] = pending[mod] ? pending[mod] : {};
    pending[mod][name] = arg;
};

V.removeEventListener = function (name, func) {
    var module = getModule(name);
    var name = module.name;
    var mod = module.mod;
    var ret = [];

    if (dataCache[mod] && dataCache[mod][name]) {
        T.each(dataCache[mod][name], function (idx, item) {
            if (item.toString() !== func.toString()) {
                ret.push(item);
            }
        });
        dataCache[mod][name] = ret;
    }
};

// 统计
V.loadImg = function (src, callback) {
    if (!src) {
        return;
    }

    var t = new Date().getTime();
    // 生成一个图片对象
    var img = window['V_fix_img' + t] = new Image();
    var i = 0;

    img.onload = img.onerror = img.onabort = function () {
        callback && callback(img);
        img.onload = img.onerror = img.onabort = null;
        try {
            delete window['V_fix_img' + t];
            img = null;
        }
        catch (e) {
            // 完成后销毁生成的图片对象
            img = null;
        }

    };
    img.src = src + '&r=' + t;
};

/* eslint-disable fecs-max-statements */
function statisic(ev, options) {
    // extends options
    if (options) {
        options.logParams && (vConf.logParams = options.logParams);
        options.logImgSrc && (vConf.logImgSrc = options.logImgSrc);
    }

    var src = (options && options.logImgSrc) ? options.logImgSrc : vConf.logImgSrc;
    var enc = encodeURIComponent;
    // 事件源元素
    var el = ev.currentTarget;
    // 事件源所在的链接节点的url
    var href;
    // 事件源所在的链接节点的title
    var title;
    // 返回
    // 事件源所在的链接节点的statisic
    var statisic;
    var partStatic;
    var queryStr = '';
    var paramStr = '';
    var i = 0;
    var cmd;
    var dedup = config.dedup;

    // 不需要统计的元素，直接返回
    if (el.getAttribute('data-static')) {
        return;
    }
    // /读取元素href与title
    href = el.href || el.getAttribute('href', 2) || (el.value ? el.value : '');

    title = el.getAttribute('title', 2) || el.innerHTML;
    // 链接处理
    if (href && !(/^(javascript|#)/.test(href))) {
        href = href;
    }
    else {
        href = '';
    }
    // title处理
    if (title && !(/^\s*</i.test(title)) && !(/>\s*$/i.test(title))) {
        title = title;
    }
    else {
        title = '';
    }
    // 统计参数串
    // 公有参数

    paramStr = vConf.logParams.toString();

    // a 私有
    statisic = el.getAttribute('static', 2) || '';
    // 区域统计参数串
    partStatic = getParentAttr(el, 'static') || null;

    // 去重
    if (dedup) {
        (function () {
            var paramJson = typeof paramStr === 'string' && T.url.queryToJson(paramStr);
            var staticJson = typeof statisic === 'string' && T.url.queryToJson(statisic);
            var parJson = typeof partStatic === 'string' && T.url.queryToJson(partStatic);
            function returnValue(v) {
                return v;
            }
            // 局部 > 全局
            if (dedup === 1 && paramJson) {
                if (staticJson) {
                    for (var key in staticJson) {
                        if (paramJson[key]) {
                            delete paramJson[key];
                        }
                    }
                }
                if (parJson) {
                    for (var key in parJson) {
                        if (paramJson[key]) {
                            delete paramJson[key];
                        }
                    }
                }
                paramStr = T.url.jsonToQuery(paramJson, returnValue);

            // 全局 > 局部
            }
            else {
                if (dedup === 2 && paramJson) {
                    for (var key in paramJson) {
                        if (staticJson && staticJson[key]) {
                            delete staticJson[key];
                        }
                        if (parJson && parJson[key]) {
                            delete parJson[key];
                        }
                    }
                    if (staticJson) {
                        statisic = T.url.jsonToQuery(staticJson, returnValue);
                    }
                    if (parJson) {
                        partStatic = T.url.jsonToQuery(parJson, returnValue);
                    }
                }
            }
        }());
    }

    // extends partStatic?
    // statisic = T.object.extend(partStatic,statisic);
    statisic = (paramStr === '' ? '' : paramStr + '&') + (partStatic ? partStatic + '&' : '') + statisic;

    // 去除重复的值，保留最后面的一个
    statisic = statisic.match(/(?:[^&|^=]+=[^&]+)/g).join('&');

    var clt = T.url.getQueryValue(statisic, 'clt') || null;

    // 记录首次点击时间
    if (clt && !V.cache.get('STATISIC_' + clt) && PAGE_DOM_READY_TIME) {
        var clTime = (new Date()).getTime() - PAGE_DOM_READY_TIME;
        // param.clt = clt;
        V.cache.set('STATISIC_' + clt, clt);
    // PAGE_DOM_READY_TIME = null;
    }

    //
    queryStr = statisic;
    if (!/(^|&)ti=([^&]+)?/.test(queryStr) && title) {
        queryStr += ('&ti=' + enc(title));
    }
    if (!/(^|&)u=([^&]+)?/.test(queryStr) && href) {
        queryStr += ('&u=' + enc(href));
    }
    if (clTime) {
        queryStr += ('&clti=' + clTime);
    }
    // cmd
    // 可执行条件
    cmd = el.getAttribute('cmd') || null;
    // 使用cmd对统计参数进行处理时，需要返回处理好的字符串
    if (cmd) {
        try {
            var tempFun = Function('' + cmd + '')();
            if (T.isFunction(tempFun)) {
                var tempStr = tempFun(el, queryStr);
                if (T.isString(tempStr)) {
                    queryStr = tempStr;
                }
            }
        }
        catch (e) {}
    }

    var str = src + '?' + queryStr;
    // 发送统计请求
    V.loadImg(str);

    // 向上查找属性
    function getParentAttr(domEl, attr, deep) {
        deep = deep || 10;
        domEl = domEl.parentNode;

        if (!domEl || domEl === document.body || domEl === document.documentElement) {
            return;
        }

        var attribute = domEl.getAttribute(attr) || null;
        var i = 0;

        if (!attribute) {
            while (domEl && domEl !== document.body
                && domEl !== document.documentElement && domEl.getAttribute
                && !attribute && domEl.parentNode && domEl.parentNode.getAttribute && i <= deep) {

                domEl = domEl.parentNode;
                attribute = domEl.getAttribute(attr) || null;
                i += 1;
            }
        }
        return attribute;
    }
}
/* eslint-enable fecs-max-statements */

V.nsclick = statisic;
V.nsclick.setParam = function (key, value) {
    if (T.isString(vConf.logParams)) {
        var re = new RegExp('[&|\?]' + key + '=[^&]+');
        vConf.logParams = vConf.logParams.replace(re, '');
        vConf.logParams += '&' + key + '=' + value;
    }
    else {
        vConf.logParams[key] = value;
    }
};

V.nsclick.concatStr = function (str) {
    str = str.replace(/^&/, '');
    vConf.logParams += '&' + str;
};

V.nsclick.extString = function (str) {
    var params = str.split('&');
    var param;
    var i = 0;
    var l = params.length;

    for (; i < l; i += 1) {
        param = params[i].split('=');
        if (param.length === 2) {
            V.nsclick.setParam(param[0], param[1]);
        }
    }
};

/**
 * 发送统计参数
 * @param  {mixed} params     要发送的统计参数，Object 或者 Function，Function返回Object或string
 * @param  {Object} defaults  默认pid=104，并且页面会配置refer、tn等参数，此参数会替换默认配置，仅当次有效
 * @param  {string} imgSrc    统计图片地址，可根据需要发送v.gif，p.gif，u.gif
 */

/*V.nsclick.send({
    login: true,
    bl: 'top_area'
}, {
    pid: 109,
    tn: 'search'
}, 'http://nsclick.baidu.com/u.gif');
V.nsclick.send(function () {
    var para = {
        site: 'vbaidu',
        bl: 'test'
    };

    if (~location.hostname.indexOf('.hao123.com')) {
        para.site = 'hao123';
        para.pid = 120;
    }

    return para;
});
V.nsclick.send(function () {
    return '&bl=asd&pid=233&tn=asdf';
});
*/

V.nsclick.send = function (params, defaults, imgSrc) {
    var defaultParams = $.extend({}, defaults || vConf.logParams);
    delete defaultParams.toString; // 删除无用的

    var strParam = '';
    if ($.isPlainObject(params)) {
        $.extend(defaultParams, params);
    }
    else if ($.isFunction(params)) {
        var ret = params();
        if ($.isPlainObject(ret)) {
            $.extend(defaultParams, ret);
        }
        else {
            ret && (strParam += ret);
        }
    }

    var logStr = paramToString(defaultParams);
    var regPid = /pid=(\d+)/;
    if (regPid.test(strParam)) {
        var pid = RegExp.$1;
        logStr = logStr.replace(regPid, function () {
            return 'pid=' + pid;
        });
        strParam = strParam.replace(regPid, '');
    }

    strParam && (logStr += '&' + strParam.replace(/^&*/, '').replace(/&&*/g, '&'));

    V.loadImg((imgSrc || vConf.logImgSrc) + '?' + logStr);
};

/**
 * 统计相关配置
 * @param {Object} options 参数
 */
V.nsclick.setConfig = function (options) {
    T.extend(config, options);
};

$(document.body).on('mousedown', 'a', V.nsclick);


});
