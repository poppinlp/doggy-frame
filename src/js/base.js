/**
 * @method throttle 用以提供resize、scroll等高频率事件的触发控制
 * @param {Function} fn 执行的函数
 * @param {Number} delay 延迟
 */
function throttle (fn, delay) {
    var timer = true;
    return function () {
        var context = this, args = arguments;
        if (timer) {
            fn.apply(context, args);
            timer = false;
            setTimeout(function () { timer = true; }, delay);
        }
    };
}

/**
 * @method initTab 用以初始化页面中的tab
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle
 * @param {Selector} config.selSheet
 * @param {String} config.trigger 触发方式
 * @param {String} config.currentClass 选中时给toggle添加的类
 * @param {String} config.effect 切换content时使用的效果 show | fade | slide
 */
function initTab (selContainer, config) {
    var _config = {
        selToggle: '.tab__nav a',
        selSheet: '.tab__sheet',
        currentClass: 'current',
        effect: 'show',
        trigger: 'click'
    };
    $.extend(_config, config);
    selContainer = selContainer || '.tab';

    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    var nlToggles = ndContainer.find(_config.selToggle),
        nlContents = ndContainer.find(_config.selSheet);

    nlToggles.bind(_config.trigger, function () {
        var _this = $(this);
        nlToggles.removeClass(_config.currentClass);
        _this.addClass(_config.currentClass);
        switch (_config.effect) {
        case 'show':
            nlContents.hide();
            nlContents.eq(nlToggles.index(_this)).show();
            break;
        case 'fade':
            nlContents.hide();
            nlContents.eq(nlToggles.index(_this)).fadeIn();
            break;
        case 'slide':
            nlContents.hide();
            nlContents.eq(nlToggles.index(_this)).slideDown();
            break;
        default:
            nlContents.hide();
            nlContents.eq(nlToggles.index(_this)).show();
        }
    });
}

/**
 * @method initLazyload
 * @description 用以初始化页面上图片的lazyload
 */
function initLazyload () {
    var imgs = $('.lazy');
    $(window).scroll(throttle(lazyload, 50));

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
}

/**
 * @method setCookie
 * @description 设置cookie
 * @param {String} key
 * @param {String} value
 * @param {Number} expire
 */
function setCookie (key, value, expire)	{
    var DAY = 24 * 60 * 60 * 1000,
        now = new Date(),
        exp = expire ? expire : 30;

    now.setTime(now.getTime() + exp * DAY);
    document.cookie = key + "=" + encodeURIComponent(value) + "; path=/" + "; expires=" + now.toGMTString();
}

/**
 * @method getCookie
 * @description 读取cookie
 * @param {String} key
 * @return value of the key
 */
function getCookie (key) {
    var keys = document.cookie.split("; "),
        len = keys.length, tmp;

    while (len--) {
        tmp = keys[len].split('=');
        if (tmp[0] === key) {
            return decodeURIComponent(tmp[1]);
        }
    }
}

/**
 * @method initDropdown
 * @description 初始化dropdown
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle
 * @param {Selector} config.selContent
 * @param {String} config.trigger 触发方式
 * @param {String} config.effect 使用的效果 show | fade | slide
 */
function initDropdown (selContainer, config) {
    var _config = {
        selToggle: '.dropdown__trigger',
        selContent: '.dropdown__content',
        trigger: 'click',
        effect: "show",
        offset: 5,
        speed: 'fast'
    };
    $.extend(_config, config);
    selContainer = selContainer || '.dropdown';

    var ndContainer = $(selContainer);
    if (!ndContainer) return;

    var ndToggle = ndContainer.find(_config.selToggle),
        ndContent = ndContainer.find(_config.selContent);

    ndContent.width(ndContainer.width() - 2).css('top', ndContainer.height() + _config.offset);

    ndToggle.bind(_config.trigger, function () {
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
        default:
            ndContent.slideToggle(_config.speed);
            break;
        }
    });
}

/**
 * @method initSelect
 * @param {Selector} selContainer
 * @param {Object} config
 * @param {Selector} config.selToggle
 * @param {Selector} config.selContent
 * @param {String} config.trigger
 */
function initSelect (selContainer, config) {
    var _config = {
        selToggle: '.select__trigger',
        selContent: '.select__content',
        trigger: 'click'
    };
    $.extend(_config, config);
    selContainer = selContainer || '.select';

    var ndContainer = $(selContainer);
    if (!ndContainer) return;

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
}

/**
 * @class loadQueue
 * @description 管理onload之后的JS任务队列
 */
var loadQueue = function() {
    var queue = [], flag = false,
        o = {
            push: function (cb) {
                var params = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
                if (flag) cb.apply(null, params); else queue.push([cb, params]);
            },
            _exec: function () {
                var item;
                while (queue.length) {
                    item = queue.shift();
                    item[0].apply(null, item[1]);
                }
            }
        };
    window.onload = function () {
        flag = true;
        o._exec();
    };
    return o;
}();

// init lozyload and uix component
loadQueue.push(function () {
    $('[data-uix]').each(function () {
        var instance = $(this),
            params = instance.data('params');
        switch (instance.data('uix')) {
        case 'tab':
            initTab(instance, params);
            break;
        case 'dropdown':
            initDropdown(instance, params);
            break;
        case 'select':
            initSelect(instance, params);
            break;
        }
    });
    initLazyload();
});
