/**
 * @class loadQueue
 * @description 管理onload之后的JS任务队列
 */
doggy.loadQueue = function () {
    var queue = [], flag = false,
        o = {
            push: function (cb) {
                var params = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
                if (flag) cb.apply(null, params); else queue.push([cb, params]);
            },
            _exec: function () {
                var item;
                while (queue.length) {
                    item = queue.shift();
                    item[0].apply(null, item[1]);
                }
            }
        };
    window.onload = function () {
        flag = true;
        o._exec();
    };
    return o;
}();
