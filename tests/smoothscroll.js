describe('Smoothscroll', function () {
    describe('#init', function () {
        var clock = sinon.useFakeTimers();

        $('body').height(2000).append([
            '<div class="J-smoothscroll">',
                '<a data-scroll="1000" href="javascript:void(0)">button</a>',
            '</div>'
        ].join(''));
        doggy.initSmoothscroll('.J-smoothscroll');

        var ndSmoothscroll = $('.J-smoothscroll a');
        it('Can\t create smoothscroll element', function () {
            assert.equal(true, ndSmoothscroll.length);
        });
        it('Smoothscroll doesn\'t work', function () {
            ndSmoothscroll.trigger('click');

            clock.tick(320);
            assert.equal(1000, $('body').scrollTop());

            clock.restore();
        });
    });
});
