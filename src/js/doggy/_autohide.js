/**
 * @method initAutoHide
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {Number|Selector} config.trigger 如果是数字，则N毫秒后隐藏；如果是选择器，则那个选择器元素被点击的时候隐藏
 * @param {String} config.effect 隐藏动画 show | fade | slide
 * @param {Number|String} config.speed 动画速度
 */
doggy.initAutoHide = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        trigger: 'body',
        effect: 'show',
        speed: 'fast'
    };
    $.extend(_config, config);

    if ($.isNumeric(_config.trigger)) {
        setTimeout(+_config.trigger, _hide);
    } else {
        $(_config.trigger).on('click', function () {
            setTimeout(function () {
                if (ndContainer.css('display') === 'block') {
                    _hide();
                }
            }, 50);
        });
    }

    ndContainer.data('init');

    function _hide () {
        switch (_config.effect) {
        case 'slide':
            ndContainer.slideUp(_config.speed);
            break;
        case 'fade':
            ndContainer.fadeOut(_config.speed);
            break;
        case 'show':
            ndContainer.hide();
            break;
        }
    }
};

$(document).ready(function () {
    var list = doggy.dataApi.autohide,
        len = list.length;
    while (len--) {
        doggy.initAutoHide(list[len].element, list[len].params);
    }
});
