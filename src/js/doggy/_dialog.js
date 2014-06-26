/**
 * @method initDialog
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {String} config.type 弹出框的类型 alert | confirm
 * @param {String} config.content 弹出框的内容
 * @param {Boolean} config.modal 是否是模态窗口
 * @param {String} config.position 非模态窗口的位置，详情见doggy.initPosition
 * @param {Boolean|Number} config.autoHide 是否自动关闭，时间为毫秒
 * @param {String} config.color 文字颜色 red | blue
 * @param {Function} config.callback confirm点击确认时候的回调函数
 */
doggy.initDialog = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    if (config.content === '') return;

    ndContainer.on('click', function () {
        var dialog = new doggy.Dialog();

        dialog.render(ndContainer, config);
        dialog.show();
    });
};

// Dialog类
doggy.Dialog = function () {
    var instance = this;

    instance.ndDialog = $('.dialog');
    if (!instance.ndDialog.length) {
        var ndBody = $('body');

        instance.ndDialog = $([
            '<div class="dialog">',
                '<div class="mask"></div>',
                '<div class="dialog__wrapper">',
                    '<p class="dialog__content"></p>',
                    '<a href="javascript:void(0)" class="J-close dialog__close">x</a>',
                    '<div class="dialog__button">',
                        '<a href="javascript:void(0)" class="btn J-yes">确定</a>',
                        '<a href="javascript:void(0)" class="btn btn--grey J-close">取消</a>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));
        // ie6不支持fixed的特殊处理
        if (doggy.ua.ie6) {
            instance.ndDialog.children('.mask').height(ndBody.outerHeight()).width(ndBody.outerWidth());
        }
        ndBody.append(instance.ndDialog);
        instance.ndDialog.delegate('.J-close', 'click', function () {
            instance.hide();
        });
    }
};

doggy.Dialog.prototype = {
    constructor: doggy.Dialog,
    show: function () {
        this.ndDialog.addClass('dialog--active');
    },
    hide: function () {
        this.ndDialog.removeClass('dialog--active');
    },
    render: function (ndTarget, config) {
        var _config = {
            type: 'alert',
            content: '',
            modal: true,
            position: 'bl',
            autoHide: false,
            color: 'blue',
            callback: function () {}
        };
        $.extend(_config, config);

        var instance = this,
            dialog = instance.ndDialog,
            className = 'dialog';

        if (_config.type === 'confirm') {
            className += ' dialog--confirm';
            dialog.undelegate('.J-yes', 'click').delegate('.J-yes', 'click', _config.callback);
        }
        dialog.find('.dialog__content').html(_config.content);
        if (_config.color === 'red') {
            className += ' dialog--red';
        }
        if (!_config.modal) {
            className += ' dialog--modeless';
            doggy.initPosition({
                selSelf: dialog,
                selTarget: ndTarget,
                position: _config.position
            });
        } else {
            // 不显示出来取不到宽和高，所以移开取值再移回来，方法比较ugly
            dialog.css('top', '-100%').addClass('dialog--active');
            var ndWrapper = dialog.children('.dialog__wrapper');
            if (doggy.ua.ie6) {
                ndWrapper.css({
                    "top": $(window).scrollTop() + $(window).height() / 2 - ndWrapper.outerHeight() / 2,
                    "left": $(window).scrollLeft() + $(window).width() / 2 - ndWrapper.outerWidth() / 2
                });
            } else {
                ndWrapper.css({
                    "margin-left": -ndWrapper.outerWidth() / 2,
                    "margin-top": -ndWrapper.outerHeight() / 2
                });
            }
            dialog.removeClass('dialog--active').css('top', '50%');
        }
        dialog.removeClass().addClass(className);
        if (_config.autoHide) {
            setTimeout(function () {
                instance.hide();
            }, _config.autoHide);
        }
    }
};

// 静态方法
doggy.Dialog.alert = function (content, color) {
    var dialog = new doggy.Dialog();
    dialog.render('', {
        content: content,
        color: color
    });
    dialog.show();
};

doggy.Dialog.confirm = function (content, callback) {
    var dialog = new doggy.Dialog();
    dialog.render('', {
        content: content,
        type: 'confirm',
        callback: callback
    });
    dialog.show();
};

$(document).ready(function () {
    var list = doggy.dataApi.dialog,
        len = list.length;
    while (len--) {
        doggy.initDialog(list[len].element, list[len].params);
    }
});
