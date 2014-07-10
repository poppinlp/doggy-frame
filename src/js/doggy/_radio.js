/**
 * @method initRadio 用以初始化页面中的radio
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector|Node} config.label
 */
doggy.initRadio = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        label: ''
    };
    $.extend(_config, config);

    ndContainer.on('click', function () {
        var nlRadio = $('.radio[name=' + $(this).attr('name') + ']');
        nlRadio.removeClass('radio--active').removeAttr('checked');
        if (ndContainer.attr('checked')) {
            ndContainer.removeClass('radio--active').removeAttr('checked');
        } else {
            ndContainer.addClass('radio--active').attr('checked', 'checked');
        }
    });

    if (_config.label) {
        var ndLabel = $(_config.label);
        if (ndLabel.length) {
            ndLabel.css({
                'cursor': 'pointer',
                'line-height': '20px',
                'vertical-align': 'middle'
            }).on('click', function () {
                ndContainer.trigger('click');
            });
        }
    }

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.radio,
        len = list.length;
    while (len--) {
        doggy.initRadio(list[len].element, list[len].params);
    }
});
