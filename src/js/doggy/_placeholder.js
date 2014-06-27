/**
 * @method initPlaceholder
 * @description 让不支持HTML5这个属性的浏览器有类似效果
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {String} config.hide 隐藏时机 focus | change
 */
doggy.initPlaceholder = function (selContainer, config) {
    if ('placeholder' in document.createElement('input')) return;

    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        hide: 'focus'
    };
    $.extend(_config, config);

    var placeholder = ndContainer.attr('placeholder'),
        hasPlaceholder = true,
        value;

    ndContainer.css('color', '#999').val(placeholder);
    if (_config.hide === 'focus') {
        ndContainer.on('focus', function () {
            if (ndContainer.val() === placeholder) {
                ndContainer.css('color', '#000').val('');
            }
        }).on('blur', function () {
            if (ndContainer.val() === '') {
                ndContainer.css('color', '#999').val(placeholder);
            }
        });
    } else {
        ndContainer.on('keyup', function () {
            value = ndContainer.val();
            if (value === '') {
                ndContainer.css('color', '#999').val(placeholder);
                hasPlaceholder = true;
            } else {
                if (hasPlaceholder) {
                    ndContainer.css('color', '#000').val(value.slice(placeholder.length));
                    hasPlaceholder = false;
                }
            }
        });
    }

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.placeholder,
        len = list.length;
    while (len--) {
        doggy.initPlaceholder(list[len].element, list[len].params);
    }
});
