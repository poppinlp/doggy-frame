/**
 * @method initTooltip
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {String} config.position tooltip相对于按钮定位的位置
 */

'use strict';

doggy.initTooltip = function (selContainer, config) {
    var $ = _rq.$,
        _config = {
            position: 'tc',
            content: '',
            autoHide: true
        },
        $container = $(selContainer),
        hideFlag = false,
        tooltip = new Tooltip(),
        cbEnter,
        cbLeave;

    if (!$container || $container.data('init')) return;

    $.extend(_config, config);

    if (_config.autoHide) {
        cbEnter = function () {
            tooltip.content(_config.content).render($container, _config.position).show();
        };
        cbLeave = function () {
            tooltip.hide();
        };
    } else {
        cbEnter = function () {
            if (hideFlag) {
                hideFlag = false;
            }
            tooltip.content(_config.content).render($container, _config.position).show();
        };
        cbLeave = function () {
            hideFlag = true;
            setTimeout(function () {
                if (hideFlag) {
                    tooltip.hide();
                }
            }, 200);
        };
        tooltip.$tooltip.bind('mouseenter', function () {
            hideFlag = false;
        });
        tooltip.$tooltip.bind('mouseleave', cbLeave);
    }

    $container.bind('mouseenter', cbEnter).bind('mouseleave', cbLeave).data('init', true);
};

// Tooltip类
doggy.Tooltip = function () {
    var that = this;

    that.$tooltip = _rq.$('.js-tooltip');

    if (that.$tooltip.length) return;

    that.$tooltip = _rq.$([
        '<div class="js-tooltip tooltip">',
        '<span class="js-tooltip-content"></span>',
        '<i class="tooltip-arrow"></i>',
        '<i class="tooltip-arrow tooltip-arrow-mask"></i>',
        '</div>'
    ].join(''));

    that.$tooltip.delegate('.js-tooltip-close', 'click', function () {
        that.hide.call(that);
    });

    _rq.$(document.body).append(that.$tooltip);
};

doggy.Tooltip.prototype = {
    constructor: Tooltip,
    show: function () {
        this.$tooltip.addClass('tooltip-active');
        return this;
    },
    hide: function () {
        this.$tooltip.removeClass('tooltip-active');
        return this;
    },
    render: function (selTarget, position) {
        var that = this;

        that.$tooltip.removeClass().addClass('js-tooltip tooltip tooltip-' + position);
        _rq.widget.initPosition({
            selSelf: that.$tooltip,
            selTarget: selTarget,
            position: position,
            offset: 10
        });

        return that;
    },
    content: function (content) {
        this.$tooltip.children('.js-tooltip-content').html(content);
        return this;
    }
};

$(document).ready(function () {
    var list = doggy.dataApi.tooltip,
        len = list.length;
    while (len--) {
        doggy.initTooltip(list[len].element, list[len].params);
    }
});
