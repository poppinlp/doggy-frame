/**
 * @method initTooltip
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {String} config.position tooltip相对于按钮定位的位置
 */
doggy.initTooltip = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    var _config = {
        position: 'tc'
    };
    $.extend(_config, config);

    ndContainer.on('mouseenter', function () {
        var tooltip = new doggy.Tooltip();

        tooltip.content(ndContainer.data('tooltip'));
        tooltip.render(ndContainer, _config.position);
        tooltip.show();
    });
    ndContainer.on('mouseleave', function () {
        var tooltip = new doggy.Tooltip();
        tooltip.hide();
    });
};

// Tooltip类
doggy.Tooltip = function () {
    this.ndTooltip = $('.tooltip');
    if (!this.ndTooltip.length) {
        this.ndTooltip = $([
            '<span class="tooltip">',
                '<span class="tooltip__content"></span>',
                '<i class="tooltip__arrow"></i>',
                '<i class="tooltip__arrow tooltip__arrow--mask"></i>',
            '</span>'
        ].join(''));
        $('body').append(this.ndTooltip);
    }
};

doggy.Tooltip.prototype = {
    constructor: doggy.Tooltip,
    show: function () {
        this.ndTooltip.addClass('tooltip--active');
    },
    hide: function () {
        this.ndTooltip.removeClass('tooltip--active');
    },
    render: function (ndTarget, position) {
        this.ndTooltip.removeClass().addClass('tooltip tooltip--' + position);
        doggy.initPosition({
            selSelf: this.ndTooltip,
            selTarget: ndTarget,
            position: position,
            offset: 10
        });
    },
    content: function (content) {
        this.ndTooltip.children('.tooltip__content').html(content);
    }
};
