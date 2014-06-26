/**
 * @method initTab 用以初始化页面中的tab
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle
 * @param {Selector} config.selSheet
 * @param {String} config.trigger 触发方式
 * @param {String} config.currentClass 选中时给toggle添加的类
 * @param {String} config.effect 切换content时使用的效果 show | fade | slide
 */
doggy.initTab = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    var _config = {
        selToggle: '.tab__nav a',
        selSheet: '.tab__sheet',
        currentClass: 'current',
        effect: 'show',
        trigger: 'click'
    };
    $.extend(_config, config);

    var nlToggles = ndContainer.find(_config.selToggle),
        nlContents = ndContainer.find(_config.selSheet);

    nlToggles.bind(_config.trigger, function () {
        var _this = $(this);
        nlToggles.removeClass(_config.currentClass);
        _this.addClass(_config.currentClass);
        switch (_config.effect) {
        case 'show':
            nlContents.hide();
            nlContents.eq(nlToggles.index(_this)).show();
            break;
        case 'fade':
            nlContents.hide();
            nlContents.eq(nlToggles.index(_this)).fadeIn();
            break;
        case 'slide':
            nlContents.hide();
            nlContents.eq(nlToggles.index(_this)).slideDown();
            break;
        default:
            nlContents.hide();
            nlContents.eq(nlToggles.index(_this)).show();
        }
    });
};

$(document).ready(function () {
    var list = doggy.dataApi.tab,
        len = list.length;
    while (len--) {
        doggy.initTab(list[len].element, list[len].params);
    }
});
