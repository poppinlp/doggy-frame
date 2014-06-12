/**
 * @method throttle 用以提供resize、scroll等高频率事件的触发控制
 * @param {Function} fn 执行的函数
 * @param {Number} delay 延迟
 */
doggy.throttle = function (fn, delay) {
    var timer = true;
    return function () {
        var context = this, args = arguments;
        if (timer) {
            fn.apply(context, args);
            timer = false;
            setTimeout(function () { timer = true; }, delay);
        }
    };
};
