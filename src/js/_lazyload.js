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
