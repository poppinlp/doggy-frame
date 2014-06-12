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
        position: '',
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
                top: targetPosition.top - selfHeight
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
                top: targetPosition.top - selfHeight
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

