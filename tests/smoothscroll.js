describe('Smoothscroll', function () {
    describe('#init', function () {

        $('body').append([
            '<div data-uix="smoothscroll" class="J-smoothscroll">',
                '<a data-scroll="1000" href="javascript:void(0)">button</a>',
            '</div>'
        ].join(''));

        var ndSmoothscroll = $('.J-smoothscroll');
        it('Can\t create smoothscroll element', function () {
            assert.equal(true, ndSmoothscroll.length);
        });
        it('DataApi doesn\'t work for smoothscroll', function () {
            assert.equal(1, doggy.dataApi.smoothscroll.length);
            assert.equal(true, ndSmoothscroll.data('init'));
        });
        it('Smoothscroll doesn\'t work', function () {
            var clock = sinon.useFakeTimers();

            $('body').height(2000);
            ndSmoothscroll.children('a').trigger('click');

            clock.tick(320);
            assert.equal(1000, $('body').scrollTop());

            clock.restore();
        });
    });
});
