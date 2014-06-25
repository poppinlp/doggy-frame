/**
 * @class ua
 * @description 获取和用户UA的相关信息
 * @property {Boolean} webkit
 * @property {Boolean} msie
 * @property {Boolean} ie6
 */
doggy.ua = {
    webkit: navigator.userAgent.toLowerCase().indexOf('webkit') !== -1,
    msie: navigator.userAgent.toLowerCase().indexOf('msie') !== -1,
    ie6: navigator.userAgent.toLowerCase().indexOf('msie 6.0') !== -1
};
