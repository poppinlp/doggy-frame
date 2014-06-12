// 初始化全局表量，各个函数都放在这个对象中，不污染全局环境
var doggy = {};

$import "_throttle.js";
$import "_tab.js";
$import "_lazyload.js";
$import "_cookie.js";
$import "_dropdown.js";
$import "_select.js";
$import "_smoothscroll.js";
$import "_autohide.js";
$import "_dialog.js";
$import "_tooltip.js";
$import "_position.js";
$import "_placeholder.js";
$import "_loadqueue.js";

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
