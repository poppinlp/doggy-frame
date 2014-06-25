/**
 * @method initDropdown
 * @description 初始化dropdown
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle
 * @param {Selector} config.selContent
 * @param {String} config.trigger 触发方式
 * @param {String} config.effect 使用的效果 show | fade | slide
 */
doggy.initDropdown = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    var _config = {
        selToggle: '.dropdown__trigger',
        selContent: '.dropdown__content',
        trigger: 'click',
        effect: "show",
        offset: 5,
        speed: 'fast'
    };
    $.extend(_config, config);

    var ndToggle = ndContainer.children(_config.selToggle),
        ndContent = ndContainer.children(_config.selContent);

    ndContent.width(ndContainer.outerWidth() - 2).css('top', ndContainer.outerHeight() + _config.offset);

    ndToggle.bind(_config.trigger, function () {
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
        default:
            ndContent.slideToggle(_config.speed);
            break;
        }
    });
};
