describe('Select', function () {
    describe('#initSelect', function () {
        $('body').append([
            '<div data-uix="select" class="J-select select">',
                '<div class="select__trigger">',
                    '<i class="icon icon--select-arrow"></i>',
                    '<p data-placeholder="请选择科室"></p>',
                '</div>',
                '<ul class="select__content">',
                    '<li><a data-val="1" href="javascript:void(0);" title="儿科">儿科</a></li>',
                    '<li><a data-val="2" href="javascript:void(0);" title="2科">2科</a></li>',
                    '<li><a data-val="3" href="javascript:void(0);" title="各种我了个去名字好长啊科">各种我了个去名字好长啊科</a></li>',
                    '<li><a data-val="4" href="javascript:void(0);" title="4科">4科</a></li>',
                '</ul>',
            '</div>'
        ].join(''));

        var ndSelect = $('.J-select'),
            ndTrigger = ndSelect.children('.select__trigger'),
            ndValue = ndTrigger.children('p'),
            ndContent = ndSelect.children('.select__content');

        it('Can\'t create select element', function () {
            assert.equal(true, ndSelect.length);
        });
        it('DataApi doesn\'t work for select', function () {
            assert.equal(1, doggy.dataApi.select.length);
            assert.equal(true, ndSelect.data('init'));
        });
        it('Placeholder doesn\'t work for select', function () {
            assert.equal(ndValue.html(), ndValue.data('placeholder'));
        });
        it('Wrong position for dropdown menu', function () {
            assert.equal(ndContent.css('top'), ndSelect.height() + 'px');
        });
        it('Wrong width for dropdown menu', function () {
            assert.equal(ndContent.width(), ndSelect.width() - 2);
        });
        it('Dropdown menu should be hidden at first', function () {
            assert.equal('none', ndContent.css('display'));
        });
        it('Can\'t trigger content display', function () {
            ndTrigger.trigger('click');
            assert.equal('block', ndContent.css('display'));
        });
    });
});
