/**
 * @method initSelect
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle
 * @param {Selector} config.selContent
 * @param {String} config.trigger
 */
doggy.initSelect = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    var _config = {
        selToggle: '.select__trigger',
        selContent: '.select__content',
        trigger: 'click'
    };
    $.extend(_config, config);

    var ndToggle = ndContainer.find(_config.selToggle),
        ndContent = ndContainer.find(_config.selContent),
        ndValue = ndToggle.children('p'),
        PLACEHOLDER = ndValue.data('placeholder');

    if (!ndValue.html()) {
        ndValue.html(PLACEHOLDER);
    }
    ndContent.width(ndContainer.width() - 2).css('top', ndContainer.height());

    ndToggle.bind(_config.trigger, function () {
        ndContent.toggle();
        ndToggle.toggleClass('active');
    });

    ndContent.delegate('a', 'click', function () {
        ndValue.html($(this).html()).data('val', $(this).data('val'));
        ndContent.hide();
        ndToggle.removeClass('active');
    });
};
