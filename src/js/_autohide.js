/**
 * @method initAutoHide
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {Number|Selector} config.trigger 如果是数字，则N毫秒后隐藏；如果是选择器，则那个选择器元素被点击的时候隐藏
 * @param {String} config.effect 特效 show | fade | slide
 */
doggy.initAutoHide = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    var _config = {
        trigger: 'body',
        effect: 'show'
    };
    $.extend(_config, config);

    ndContainer.on('autohide', function () {
        if ($.isNumeric(_config.trigger)) {
            setTimeout(+_config.trigger, function () {
                ndContainer.hide();
            });
        } else {
            var ndTrigger = $(_config.trigger);
            if (!ndTrigger) return;
            ndTrigger.on('click', function () {
                ndContainer.hide();
            });
        }
    });
};
