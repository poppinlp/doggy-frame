/**
 * @method initTooltip
 */
doggy.initTooltip = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    var arrow = '<i class="tooltip__arrow"></i><i class="tooltip__arrow tooltip__arrow--mask"></i>',
    _config = {
        position: 'tc'
    };
    $.extend(_config, config);

    ndContainer.on('mouseenter', function () {
        var ndTooltip = $('.tooltip');

        if (ndTooltip.length) {
            ndTooltip.html(ndContainer.data('tooltip') + arrow);
        } else {
            ndTooltip = $('<span style="display:none" class="tooltip">' + ndContainer.data('tooltip') + arrow + '</span>');
            $('body').append(ndTooltip);
        }
        ndTooltip.removeClass().addClass('tooltip').addClass('tooltip--' + _config.position);
        doggy.initPosition({
            selSelf: '.tooltip',
            selTarget: ndContainer,
            position: _config.position,
            offset: 10
        });
        ndTooltip.show();
    });
    ndContainer.on('mouseleave', function () {
        $('.tooltip').hide();
    });
};
