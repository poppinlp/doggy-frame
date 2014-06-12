/**
 * @method initDialog
 */
doggy.initDialog = function (config) {
    var _config = {
        title: '',
        content: '',
        modal: true,
        position: 'bl',
        autoHide: false
    };
    $.extend(_config, config);

    if (_config.title === '' && _config.content === '') return;
    // TODO
};
