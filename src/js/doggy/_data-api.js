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
            doggy.initDialog(instance, params);
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
