/**
 * @method initDropdown
 * @description 初始化dropdown
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle
 * @param {Selector} config.selContent
 * @param {String} config.trigger 触发方式
 * @param {String} config.effect 使用的效果 show | fade | slide
 * @param {Number} config.offset 距离偏差，可正可负
 * @param {Number|String} config.speed 动画速度
 * @param {Number} config.fixedWidth 下拉内容的固定宽度
 */
doggy.initDropdown = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        selToggle: '.dropdown__trigger',
        selContent: '.dropdown__content',
        trigger: 'click',
        effect: "show",
        offset: 5,
        speed: 'fast',
        fixedWidth: ''
    };
    $.extend(_config, config);

    var ndToggle = ndContainer.children(_config.selToggle),
        ndContent = ndContainer.children(_config.selContent);

    _config.fixedWidth = _config.fixedWidth ? _config.fixedWidth : ndToggle.outerWidth() - 2;
    ndContent.width(_config.fixedWidth).css({
        top: ndContainer.outerHeight() + _config.offset,
        left: -(_config.fixedWidth - ndToggle.outerWidth()) / 2
    });

    ndToggle.bind(_config.trigger, function (e) {
        e.stopPropagation();
        switch (_config.effect) {
        case 'slide':
            ndContent.slideToggle(_config.speed);
            break;
        case 'fade':
            ndContent.fadeToggle(_config.speed);
            break;
        case 'show':
            ndContent.toggle();
            break;
        }
    });

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.dropdown,
        len = list.length;
    while (len--) {
        doggy.initDropdown(list[len].element, list[len].params);
    }
});
