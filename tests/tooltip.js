describe('Tooltip', function () {
    describe('#initTooltip', function () {
        $('body')
            .append('<a class="J-tooltip" href="javascript:void(0);" data-params=\'{"position": "tc"}\' data-uix="tooltip" data-tooltip="top tip">top</a>')
            .append('<a class="J-tooltip" href="javascript:void(0);" data-params=\'{"position": "bc"}\' data-uix="tooltip" data-tooltip="bottom tip">bottom</a>');

        var nlTooltipTrigger = $('.J-tooltip');
        it('DataApi doesn\'t work for tooltip', function () {
            assert.equal(2, doggy.dataApi.tooltip.length);
            assert.equal(2, nlTooltipTrigger.filter(function () {
                return $(this).data('init');
            }).length);
        });
        it('Can\'t create tooltip element', function () {
            assert.equal(0, $('.tooltip').length);
            nlTooltipTrigger.eq(0).trigger('mouseenter');
            assert.equal(1, $('.tooltip').length);
        });
        it('There\'s some problems in tooltip render', function () {
            assert.equal('tooltip tooltip--tc tooltip--active', $('.tooltip').attr('class'));
            assert.equal('top tip', $('.tooltip').text());
        });
        it('There\'s some problems in tooltip hide', function () {
            nlTooltipTrigger.eq(0).trigger('mouseleave');
            assert.equal('none', $('.tooltip').css('display'));
        });
        it('There\'s some problems in tooltip render again', function () {
            nlTooltipTrigger.eq(1).trigger('mouseenter');
            assert.equal('tooltip tooltip--bc tooltip--active', $('.tooltip').attr('class'));
            assert.equal('bottom tip', $('.tooltip').text());
        });
        it('There should be only one tooltip element', function () {
            assert.equal(1, $('.tooltip').length);
        });
    });
});
