describe('switch', function () {
    describe('#initSwitch', function () {
        $('body').append([
            '<a data-uix="switches" href="javascript:void(0)" class="J-switch switch"></a>'
        ].join(''));

        var ndSwitch = $('.J-switch');
        it('DataApi doesn\'t work for switch', function () {
            assert.equal(1, doggy.dataApi.switches.length);
            assert.equal(true, ndSwitch.data('init'));
        });
        it('Switch doesn\'t work', function () {
            assert.equal(false, ndSwitch.hasClass('switch--active'));
            ndSwitch.trigger('click');
            assert.equal(true, ndSwitch.hasClass('switch--active'));
        });
    });
});
