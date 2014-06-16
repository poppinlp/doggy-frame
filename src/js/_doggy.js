// 初始化全局表量，各个函数都放在这个对象中，不污染全局环境
var doggy = {};

$import "doggy/_throttle.js";
$import "doggy/_tab.js";
$import "doggy/_lazyload.js";
$import "doggy/_cookie.js";
$import "doggy/_dropdown.js";
$import "doggy/_select.js";
$import "doggy/_smoothscroll.js";
$import "doggy/_autohide.js";
$import "doggy/_dialog.js";
$import "doggy/_tooltip.js";
$import "doggy/_position.js";
$import "doggy/_placeholder.js";
$import "doggy/_loadqueue.js";

// init lozyload and uix component
doggy.loadQueue.push(function () {
    $('[data-uix]').each(function () {
        var instance = $(this),
            params = instance.data('params');
        switch (instance.data('uix')) {
        case 'tab':
            doggy.initTab(instance, params);
            break;
        case 'dropdown':
            doggy.initDropdown(instance, params);
            break;
        case 'select':
            doggy.initSelect(instance, params);
            break;
        case 'smoothscroll':
            doggy.initSmoothscroll(instance, params);
            break;
        case 'dialog':
            instance.on('click', function () {
                doggy.initDialog(params);
            });
            break;
        case 'placeholder':
            doggy.initPlaceholder(instance, params);
            break;
        case 'tooltip':
            doggy.initTooltip(instance, params);
            break;
        }
    });
    doggy.initLazyload();
});
