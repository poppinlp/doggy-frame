describe('Tab', function () {
    describe('#initTab', function () {
        $('body').append([
            '<div data-uix="tab" class="J-tab tab">',
                '<ul class="tab__nav cf">',
                    '<li><a class="current" href="javascript:void(0);">tab1</a></li>',
                    '<li><a href="javascript:void(0);">tab2</a></li>',
                    '<li><a href="javascript:void(0);">tab3</a></li>',
                '</ul>',
                '<div class="tab__sheet current">tab1 sheet</div>',
                '<div class="tab__sheet">tab2 sheet</div>',
                '<div class="tab__sheet">tab3 sheet</div>',
            '</div>'
        ].join(''));

        var ndTab = $('.J-tab');
        it('Cant\'t create tab element', function () {
            assert.equal(true, ndTab.length);
        });
        it('Should only one sheet display at first', function () {
            var count = 0;
            ndTab.find('.tab__sheet').each(function () {
                if ($(this).css('display') === 'block') {
                    count++;
                }
            });
            assert.equal(1, count);
        });
        it('DataApi doesn\'t work for tab', function () {
            assert.equal(1, doggy.dataApi.tab.length);
            assert.equal(true, ndTab.data('init'));
        });
        it('Tab doesn\'t work', function () {
            ndTab.find('.tab__nav a').eq(2).trigger('click');
            assert.equal('block', ndTab.find('.tab__sheet').eq(2).css('display'));
            assert.equal('none', ndTab.find('.tab__sheet').eq(0).css('display'));
        });
    });
});
