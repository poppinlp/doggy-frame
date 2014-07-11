describe('Radio', function () {
    describe('#initRadio', function () {
        $('body').append([
            '<a data-uix="radio" href="javascript:void(0)" class="J-radio radio" name="radio-demo" data-params=\'{ "label": ".J-radio-label1" }\'></a>',
            '<a class="J-radio-label1">checkbox-label</a>',
            '<a data-uix="radio" href="javascript:void(0)" class="J-radio radio" name="radio-demo" data-params=\'{ "label": ".J-radio-label2" }\'></a>',
            '<a class="J-radio-label2">checkbox-label</a>'
        ].join(''));

        var nlRadio = $('.J-radio');
        it('Can\'t create radio element', function () {
            assert.equal(2, nlRadio.length);
        });
        it('DataApi doesn\'t work for radio', function () {
            assert.equal(2, doggy.dataApi.radio.length);
            assert.equal(true, nlRadio.data('init'));
        });
        it('Radio doesn\'t work', function () {
            assert.equal(undefined, nlRadio.eq(0).attr('checked'));
            assert.equal(false, nlRadio.eq(0).hasClass('radio--active'));
            nlRadio.eq(0).trigger('click');
            assert.equal('checked', nlRadio.eq(0).attr('checked'));
            assert.equal(true, nlRadio.eq(0).hasClass('radio--active'));
            nlRadio.eq(1).trigger('click');
            assert.equal(undefined, nlRadio.eq(0).attr('checked'));
            assert.equal('checked', nlRadio.eq(1).attr('checked'));
            assert.equal(true, nlRadio.eq(1).hasClass('radio--active'));
        });
        it('Checkbox label doesn\'t work', function () {
            var ndLabel = $('.J-radio-label1');
            ndLabel.trigger('click');
            assert.equal('checked', nlRadio.eq(0).attr('checked'));
            assert.equal(true, nlRadio.eq(0).hasClass('radio--active'));
        });
    });
});
