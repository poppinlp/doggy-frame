describe('AutoHide', function () {
    describe('#initAutoHide', function () {
        $('body').append([
            '<div data-uix="autohide" class="J-autohide-time" params=\'{ "trigger": "1000" }\'></div>',
            '<div data-uix="autohide" class="J-autohide-select" params=\'{ "effect": "show"}\'></div>'
        ].join(''));

        var ndAutohideTime = $('.J-autohide-time'),
            ndAutohideSelect = $('.J-autohide-select');
        it('DataApi doesn\'t work for autohide', function () {
            assert.equal(2, doggy.dataApi.autohide.length);
            //assert.equal(true, ndAutohideTime.data('init'));
            //assert.equal(true, ndAutohideSelect.data('init'));
        });
    });
});
