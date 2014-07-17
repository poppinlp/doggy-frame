describe('Tooltip', function () {
    describe('#initTooltip', function () {
        $('body')
            .append('<a class="J-tooltip-trigger" href="javascript:void(0);" data-params=\'{"position": "tc"}\' data-uix="tooltip" data-tooltip="top tip">top</a>')
            .append('<a class="J-tooltip-trigger" href="javascript:void(0);" data-params=\'{"position": "bc"}\' data-uix="tooltip" data-tooltip="bottom tip">bottom</a>');

        var nlTooltipTrigger = $('.J-tooltip-trigger');
        it('DataApi doesn\'t work for tooltip', function () {
            assert.equal(2, doggy.dataApi.tooltip.length);
            assert.equal(2, nlTooltipTrigger.filter(function () {
                return $(this).data('init');
            }).length);
        });
        it('Can\'t create tooltip element', function () {
            assert.equal(0, $('.J-tooltip').length);
            nlTooltipTrigger.eq(0).trigger('mouseenter');
            assert.equal(1, $('.J-tooltip').length);
        });
        it('There\'s some problems in tooltip render', function () {
            assert.equal('J-tooltip tooltip tooltip--tc tooltip--active', $('.J-tooltip').attr('class'));
            assert.equal('top tip', $('.J-tooltip').text());
        });
        it('There\'s some problems in tooltip hide', function () {
            nlTooltipTrigger.eq(0).trigger('mouseleave');
            assert.equal('none', $('.J-tooltip').css('display'));
        });
        it('There\'s some problems in tooltip render again', function () {
            nlTooltipTrigger.eq(1).trigger('mouseenter');
            assert.equal('J-tooltip tooltip tooltip--bc tooltip--active', $('.J-tooltip').attr('class'));
            assert.equal('bottom tip', $('.J-tooltip').text());
        });
        it('There should be only one tooltip element', function () {
            assert.equal(1, $('.J-tooltip').length);
        });
    });
});
