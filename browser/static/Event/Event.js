/**
 * @file: Event.js
 * @author: shangwenhe@baidu.com
 * @date: 2015-10-21 16:03
 * @description: this is a <js> file
 */
/* globals __inline __uri */

// /home/users/shangwenhe/pcApp/calendar/static/Event/Event.js start
/* eslint-disable fecs-camelcase */
var Event = function () {
    // 保证Event对象只有一个
    if (this instanceof Event) {
        // 事件队列
        this.handlers = {};
    } else {
        Event = new Event();
    }

};
Event.prototype = {
    constructor: Event,
    on: function (type, handler) {
        if (typeof this.handlers[type] === 'undefined') {
            // 事件队列 一对多
            this.handlers[type] = [];
        }
        // 事件队列中添加方法
        this.handlers[type].push(handler);
    },
    once: function (type, handler) {
        var me = this;
        // 构造一个钩子
        var onceFn = function () {
            handler.apply(null, arguments);
            // 移除构造的钩子
            me.off(type, onceFn);
        };
        this.on(type, onceFn);
    },
    trigger: function (type, arg) {
        arg && !arg.target && (arg.target = this);
        if (typeof this.handlers[type] !== 'undefined') {
            var curhandlers = this.handlers[type];
            // 遍历取出事件队列中有方法
            for (var i = 0, cle = curhandlers.length; i < cle; i++) {
                typeof curhandlers[i] === 'function' && curhandlers[i](arg);
            }
        } else {
            // throw 'Event '+type+' has be off'
        }

    },
    off: function (type, fn) {
        var args = Array.prototype.slice.call(arguments, 0);
        switch (args.length) {
            case 0:
                throw 'Event off no EventType';
                return;
                // code
                break;
            case 1:
                typeof this.handlers[type] !== 'undefined' && (
                    this.handlers[type] = undefined,
                    delete this.handlers[type]
                );
                // code
                break;
            case 2:
                if (typeof this.handlers[type] !== 'undefined') {
                    var curhandlers = this.handlers[type];
                    for (var i = 0, cle = curhandlers.length; i < cle; i++) {
                        // 删除事件队列中对应的方法
                        curhandlers[i] === fn && curhandlers.splice(i, 1);
                    }
                    // 删除长度为0的队列
                    curhandlers.length === 0 && (
                        this.handlers[type] = undefined,
                        delete this.handlers[type]
                    );
                }
                // code
                break;
        }
    }
};

module.exports =  new Event();
/* eslint-enable fecs-camelcase */
