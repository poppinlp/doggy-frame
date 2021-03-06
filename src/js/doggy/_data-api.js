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
