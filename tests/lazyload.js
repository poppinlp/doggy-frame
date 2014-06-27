describe('Lazyload', function () {
    it('Lazyload doesn\'t work', function () {
        $('body').height(2000).append(
            '<img class="J-lazyimg lazy" alt="lazyload" src="" data-src="img/position.png" height="100" width="100" style="position:absolute;top:1000px;left:0;" />'
        );
        doggy.initLazyload();

        var ndLazyimg = $('.J-lazyimg');
        assert.equal('', ndLazyimg.attr('src'));
        $('body').scrollTop(1500).trigger('scroll');
        assert.equal('img/position.png', ndLazyimg.attr('src'));
    });
});
