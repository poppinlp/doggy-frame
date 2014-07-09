/**
 * @method initCheckbox 用以初始化页面中的checkbox
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector|Node} config.label
 */
doggy.initCheckbox = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        label: ''
    };
    $.extend(_config, config);

    ndContainer.on('click', function () {
        if (ndContainer.attr('checked')) {
            ndContainer.removeClass('checkbox--active').removeAttr('checked');
        } else {
            ndContainer.addClass('checkbox--active').attr('checked', 'checked');
        }
    });

    if (_config.label) {
        var ndLabel = $(_config.label);
        if (ndLabel.length) {
            ndLabel.css('cursor', 'pointer').on('click', function () {
                ndContainer.trigger('click');
            });
        }
    }

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.checkbox,
        len = list.length;
    while (len--) {
        doggy.initCheckbox(list[len].element, list[len].params);
    }
});
