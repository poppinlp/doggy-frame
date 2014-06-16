/**
 * @method setCookie
 * @description 设置cookie
 * @param {String} key
 * @param {String} value
 * @param {Number} expire
 */
doggy.setCookie = function (key, value, expire)	{
    var DAY = 24 * 60 * 60 * 1000,
        now = new Date(),
        exp = expire ? expire : 30;

    now.setTime(now.getTime() + exp * DAY);
    document.cookie = key + "=" + encodeURIComponent(value) + "; path=/" + "; expires=" + now.toGMTString();
};

/**
 * @method getCookie
 * @description 读取cookie
 * @param {String} key
 * @return value of the key
 */
doggy.getCookie = function (key) {
    var keys = document.cookie.split("; "),
        len = keys.length, tmp;

    while (len--) {
        tmp = keys[len].split('=');
        if (tmp[0] === key) {
            return decodeURIComponent(tmp[1]);
        }
    }
};
