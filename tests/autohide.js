describe('AutoHide', function () {
    describe('#initAutoHide', function () {
        $('body').append([
            '<div data-uix="autohide" class="J-autohide-time" data-params=\'{ "trigger": "1000" }\'>123</div>',
            '<div data-uix="autohide" class="J-autohide-select" data-params=\'{ "trigger": ".J-autohide-trigger" }\'>123</div>',
            '<a href="javascript:void(0)" class="J-autohide-trigger">trigger</a>'
        ].join(''));

        var ndAutohideTime = $('.J-autohide-time'),
            ndAutohideSelect = $('.J-autohide-select');
        it('DataApi doesn\'t work for autohide', function () {
            assert.equal(2, doggy.dataApi.autohide.length);
            assert.equal(true, ndAutohideTime.data('init'));
            assert.equal(true, ndAutohideSelect.data('init'));
        });
        it('Autohide doesn\'t work in time config', function () {
            var clock = sinon.useFakeTimers();
            ndAutohideTime.trigger('autohide');
            assert.equal('block', ndAutohideTime.css('display'));
            clock.tick(1050);
            assert.equal('none', ndAutohideTime.css('display'));
        });
        it('Autohide doesn\'t work in trigger config', function () {
            var clock = sinon.useFakeTimers();
            assert.equal('block', ndAutohideSelect.css('display'));
            $('.J-autohide-trigger').trigger('click');
            clock.tick(100);
            assert.equal('none', ndAutohideSelect.css('display'));
        });
    });
});
