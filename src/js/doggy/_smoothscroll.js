/**
 * @method initSmoothscroll
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle 触发节点，每个节点上需要带一个data-scroll属性，标明滚动目标，该目标可以是一个节点或者一个Y坐标
 * @param {String} config.easing 滚动特效
 * @param {Number} config.duration 滚动时间
 */

doggy.initSmoothscroll = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        selToggle: 'a',
        easing: 'swing',
        duration: 300
    };
    $.extend(_config, config);

    ndContainer.delegate(_config.selToggle, 'click', function () {
        var target = $(this).data('scroll'),
            box = doggy.ua.webkit ? document.body : document.documentElement;
        if (!target) target = 0;
        target = $.isNumeric(target) ? target : $(target).offset().top;
        $(box).animate({
            scrollTop: target
        },{
            duration: _config.duration,
            easing: _config.easing
        });
    });

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.smoothscroll,
        len = list.length;
    while (len--) {
        doggy.initSmoothscroll(list[len].element, list[len].params);
    }
});
