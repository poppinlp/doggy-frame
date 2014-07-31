// 初始化全局表量，各个函数都放在这个对象中，不污染全局环境
var doggy = {};

$(document).ready(function () {
    doggy.dataApi = {
        tab: [],
        dropdown: [],
        select: [],
        smoothscroll: [],
        dialog: [],
        placeholder: [],
        tooltip: [],
        checkbox: [],
        autohide: [],
        radio: [],
        switches: []
    };
    $('[data-uix]').each(function () {
        var instance = $(this),
            params = instance.data('params');
        doggy.dataApi[instance.data('uix')].push({
            element: instance,
            params: params
        });
    });
});
/**
 * @method throttle 用以提供resize、scroll等高频率事件的触发控制
 * @param {Function} fn 执行的函数
 * @param {Number} delay 延迟
 */
doggy.throttle = function (fn, delay) {
    var timer = true;
    return function () {
        var context = this, args = arguments;
        if (timer) {
            fn.apply(context, args);
            timer = false;
            setTimeout(function () { timer = true; }, delay);
        }
    };
};
/**
 * @method initLazyload
 * @description 用以初始化页面上图片的lazyload
 */
doggy.initLazyload = function () {
    var imgs = $('.lazy');
    $(window).scroll(doggy.throttle(lazyload, 50));

    function lazyload () {
        var scrollTop = $(window).scrollTop(),
            winHeight = $(window).height();

        imgs = imgs.filter(function (index) {
            var tmp = $(this);
            if (tmp.offset().top <= scrollTop + winHeight) {
                tmp.attr('src', tmp.data('src'));
                return false;
            }
            return true;
        });
        if (imgs.length === 0) {
            $(document).off('scroll');
        }
    }
};
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
    if (!ndContainer || ndContainer.data('init')) return;

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
        var instance = $(this);
        nlToggles.removeClass(_config.currentClass);
        instance.addClass(_config.currentClass);
        switch (_config.effect) {
        case 'fade':
            nlContents.hide().removeClass('current');
            nlContents.eq(nlToggles.index(instance)).addClass('current').fadeIn();
            break;
        case 'slide':
            nlContents.hide().removeClass('current');
            nlContents.eq(nlToggles.index(instance)).addClass('current').slideDown();
            break;
        case 'show':
            nlContents.hide().removeClass('current');
            nlContents.eq(nlToggles.index(instance)).addClass('current').show();
            break;
        }
    });

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.tab,
        len = list.length;
    while (len--) {
        doggy.initTab(list[len].element, list[len].params);
    }
});
/**
 * @method setCookie
 * @description 设置cookie
 * @param {String} key
 * @param {String} value
 * @param {Number} expire
 */
doggy.setCookie = function (key, value, expire)	{
    var DAY = 24 * 60 * 60 * 1000,
        now = new Date(),
        exp = expire ? expire : 30;

    now.setTime(now.getTime() + exp * DAY);
    document.cookie = key + "=" + encodeURIComponent(value) + "; path=/" + "; expires=" + now.toGMTString();
};

/**
 * @method getCookie
 * @description 读取cookie
 * @param {String} key
 * @return value of the key
 */
doggy.getCookie = function (key) {
    var keys = document.cookie.split("; "),
        len = keys.length, tmp;

    while (len--) {
        tmp = keys[len].split('=');
        if (tmp[0] === key) {
            return decodeURIComponent(tmp[1]);
        }
    }
};
/**
 * @method initDropdown
 * @description 初始化dropdown
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle
 * @param {Selector} config.selContent
 * @param {String} config.trigger 触发方式
 * @param {String} config.effect 使用的效果 show | fade | slide
 * @param {Number} config.offset 距离偏差，可正可负
 * @param {Number|String} config.speed 动画速度
 * @param {Number} config.fixedWidth 下拉内容的固定宽度
 */
doggy.initDropdown = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        selToggle: '.dropdown__trigger',
        selContent: '.dropdown__content',
        trigger: 'click',
        effect: "show",
        offset: 5,
        speed: 'fast',
        fixedWidth: ''
    };
    $.extend(_config, config);

    var ndToggle = ndContainer.children(_config.selToggle),
        ndContent = ndContainer.children(_config.selContent);

    _config.fixedWidth = _config.fixedWidth ? _config.fixedWidth : ndToggle.outerWidth() - 2;
    ndContent.width(_config.fixedWidth).css({
        top: ndContainer.outerHeight() + _config.offset,
        left: -(_config.fixedWidth - ndToggle.outerWidth()) / 2
    });

    ndToggle.bind(_config.trigger, function (e) {
        e.stopPropagation();
        switch (_config.effect) {
        case 'slide':
            ndContent.slideToggle(_config.speed);
            break;
        case 'fade':
            ndContent.fadeToggle(_config.speed);
            break;
        case 'show':
            ndContent.toggle();
            break;
        }
    });

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.dropdown,
        len = list.length;
    while (len--) {
        doggy.initDropdown(list[len].element, list[len].params);
    }
});
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
    if (!ndContainer || ndContainer.data('init')) return;

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

    ndToggle.bind(_config.trigger, function (e) {
        e.stopPropagation();
        if ($(this).parent('.select').hasClass('select--disable')) return;
        ndContent.toggle();
        ndToggle.toggleClass('active');
    });

    ndContent.delegate('a', 'click', function () {
        ndValue.html($(this).html()).data('val', $(this).data('val'));
        ndContent.hide();
        ndToggle.removeClass('active');
    });

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.select,
        len = list.length;
    while (len--) {
        doggy.initSelect(list[len].element, list[len].params);
    }
});
/**
 * @method initSmoothscroll
 * @param {Selector|Node} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle 触发节点，每个节点上需要带一个data-scroll属性，标明滚动目标，该目标可以是一个节点或者一个Y坐标
 * @param {String} config.easing 滚动特效
 * @param {Number} config.duration 滚动时间
 */

doggy.initSmoothscroll = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        selToggle: 'a',
        easing: 'swing',
        duration: 300
    };
    $.extend(_config, config);

    ndContainer.delegate(_config.selToggle, 'click', function () {
        var target = $(this).data('scroll'),
            box = doggy.ua.webkit ? document.body : document.documentElement;
        if (!target) target = 0;
        target = $.isNumeric(target) ? target : $(target).offset().top;
        $(box).animate({
            scrollTop: target
        },{
            duration: _config.duration,
            easing: _config.easing
        });
    });

    ndContainer.data('init', true);
};

$(document).ready(function () {
    var list = doggy.dataApi.smoothscroll,
        len = list.length;
    while (len--) {
        doggy.initSmoothscroll(list[len].element, list[len].params);
    }
});
/**
 * @method initAutoHide
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {Number|Selector} config.trigger 如果是数字，则N毫秒后隐藏；如果是选择器，则那个选择器元素被点击的时候隐藏
 * @param {String} config.effect 隐藏动画 show | fade | slide
 * @param {Number|String} config.speed 动画速度
 */
doggy.initAutoHide = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        trigger: '',
        effect: 'show',
        speed: 'fast'
    };
    $.extend(_config, config);

    if ($.isNumeric(_config.trigger)) {
        ndContainer.on('autohide', function () {
            setTimeout(_hide, _config.trigger);
        });
    } else {
        _config.trigger = _config.trigger ? $(_config.trigger) : $(window);
        _config.trigger.on('click', function () {
            setTimeout(_hide, 50);
        });
    }

    ndContainer.data('init', true);

    function _hide () {
        if (ndContainer.css('display') === 'block') {
            switch (_config.effect) {
            case 'slide':
                ndContainer.slideUp(_config.speed);
                break;
            case 'fade':
                ndContainer.fadeOut(_config.speed);
                break;
            case 'show':
                ndContainer.hide();
                break;
            }
        }
    }
};

$(document).ready(function () {
    var list = doggy.dataApi.autohide,
        len = list.length;
    while (len--) {
        doggy.initAutoHide(list[len].element, list[len].params);
    }
});
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
    if (!ndContainer || ndContainer.data('init') || config.content === '') return;

    ndContainer.on('click', function () {
        var dialog = new doggy.Dialog();

        dialog.render(ndContainer, config);
        dialog.show();
    });

    ndContainer.data('init', true);
};

// Dialog类
doggy.Dialog = function () {
    var instance = this;

    instance.ndDialog = $('.J-dialog');
    if (!instance.ndDialog.length) {
        var ndBody = $('body');

        instance.ndDialog = $([
            '<div class="J-dialog dialog">',
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
            className = 'J-dialog dialog';

        if (_config.type === 'confirm') {
            className += ' dialog--confirm';
            dialog.undelegate('.J-yes', 'click').delegate('.J-yes', 'click', function () {
                instance.hide();
                _config.callback();
            });
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
    var list = doggy.dataApi.checkbox,
        len = list.length;
    while (len--) {
        doggy.initCheckbox(list[len].element, list[len].params);
    }
});
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
/**
 * @method initTooltip
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {String} config.position tooltip相对于按钮定位的位置
 */
doggy.initTooltip = function (selContainer, config) {
    var ndContainer = $(selContainer);
    if (!ndContainer || ndContainer.data('init')) return;

    var _config = {
        position: 'tc'
    };
    $.extend(_config, config);

    ndContainer
        .on('mouseenter', function () {
            var tooltip = new doggy.Tooltip();

            tooltip.content(ndContainer.data('tooltip'));
            tooltip.render(ndContainer, _config.position);
            tooltip.show();
        })
        .on('mouseleave', function () {
            var tooltip = new doggy.Tooltip();
            tooltip.hide();
        })
        .data('init', true);
};

// Tooltip类
doggy.Tooltip = function () {
    this.ndTooltip = $('.J-tooltip');
    if (!this.ndTooltip.length) {
        this.ndTooltip = $([
            '<span class="J-tooltip tooltip">',
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
        this.ndTooltip.removeClass().addClass('J-tooltip tooltip tooltip--' + position);
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

$(document).ready(function () {
    var list = doggy.dataApi.tooltip,
        len = list.length;
    while (len--) {
        doggy.initTooltip(list[len].element, list[len].params);
    }
});
/**
 * @method initPosition
 * @param {Object} config
 * @param {Selector} config.selSelf 需要定位的元素
 * @param {Selector} config.selTarget 相对于这个元素定位
 * @param {String} config.position 定位的位置 tl,tc,tr,rt,rc,rb,br,bc,bl,lb,lc,lt(t=top, c=center, b=bottom, l=left, r=right)
 * @param {Number} config.offset 中间的空隙
 */
doggy.initPosition = function (config) {
    var _config = {
        selSelf: '',
        selTarget: '',
        position: 'bl',
        offset: 1
    };
    $.extend(_config, config);

    var ndSelf = $(_config.selSelf),
        ndTarget = $(_config.selTarget);
    if (!ndSelf || !ndTarget) return;

    var targetPosition = ndTarget.offset(),
        targetHeight = ndTarget.height(),
        targetWidth = ndTarget.width(),
        selfHeight = ndSelf.outerHeight(),
        selfWidth = ndSelf.outerWidth();

    _setPosition();

    function _setPosition () {
        switch (_config.position) {
        case 'tl':
            ndSelf.css({
                left: targetPosition.left,
                top: targetPosition.top - _config.offset - selfHeight
            });
            break;
        case 'tc':
            ndSelf.css({
                left: targetPosition.left + targetWidth / 2 - selfWidth / 2,
                top: targetPosition.top - _config.offset - selfHeight
            });
            break;
        case 'tr':
            ndSelf.css({
                left: targetPosition.left + targetWidth - selfWidth,
                top: targetPosition.top - _config.offset - selfHeight
            });
            break;
        case 'rt':
            ndSelf.css({
                left: targetPosition.left + targetWidth + _config.offset,
                top: targetPosition.top
            });
            break;
        case 'rc':
            ndSelf.css({
                left: targetPosition.left + targetWidth + _config.offset,
                top: targetPosition.top + targetHeight / 2 - selfHeight / 2
            });
            break;
        case 'rb':
            ndSelf.css({
                left: targetPosition.left + targetWidth + _config.offset,
                top: targetPosition.top + targetHeight - selfHeight
            });
            break;
        case 'br':
            ndSelf.css({
                left: targetPosition.left + targetWidth - selfWidth,
                top: targetPosition.top + targetHeight + _config.offset
            });
            break;
        case 'bc':
            ndSelf.css({
                left: targetPosition.left + targetWidth / 2 - selfWidth / 2,
                top: targetPosition.top + targetHeight + _config.offset
            });
            break;
        case 'bl':
            ndSelf.css({
                left: targetPosition.left,
                top: targetPosition.top + targetHeight + _config.offset
            });
            break;
        case 'lb':
            ndSelf.css({
                left: targetPosition.left - selfWidth - _config.offset,
                top: targetPosition.top + targetHeight - selfHeight
            });
            break;
        case 'lc':
            ndSelf.css({
                left: targetPosition.left - selfWidth - _config.offset,
                top: targetPosition.top + targetHeight / 2 - selfHeight / 2
            });
            break;
        case 'lt':
            ndSelf.css({
                left: targetPosition.left - selfWidth - _config.offset,
                top: targetPosition.top
            });
            break;
        }
    }
};

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
            } else if (hasPlaceholder) {
                ndContainer.css('color', '#000').val(value.slice(placeholder.length));
                hasPlaceholder = false;
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
/**
 * @class ua
 * @description 获取和用户UA的相关信息
 * @property {Boolean} webkit
 * @property {Boolean} msie
 * @property {Boolean} ie6
 */
doggy.ua = {
    webkit: navigator.userAgent.toLowerCase().indexOf('webkit') !== -1,
    msie: navigator.userAgent.toLowerCase().indexOf('msie') !== -1,
    ie6: navigator.userAgent.toLowerCase().indexOf('msie 6.0') !== -1
};
