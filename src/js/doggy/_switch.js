/**
 * @method initSwitch 用以初始化页面中的switch
 */
doggy.initSwitch = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
    };
    $.extend(_config, config);

    ndContainer.append([
        '<i class="switch__line"></i>',
        '<i class="switch__button"></i>'
    ].join(''));

    ndContainer.on('click', function () {
        if (ndContainer.attr('checked')) {
            ndContainer.removeClass('switch--active').removeAttr('checked');
        } else {
            ndContainer.addClass('switch--active').attr('checked', 'checked');
        }
    });

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.switches,
        len = list.length;
    while (len--) {
        doggy.initSwitch(list[len].element, list[len].params);
    }
});
