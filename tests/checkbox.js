describe('Checkbox', function () {
    describe('initCheckbox', function () {
        $('body').append([
            '<a data-uix="checkbox" href="javascript:void(0)" class="J-checkbox checkbox"></a>'
        ].join(''));

        var ndCheckbox = $('.J-checkbox');
        it('Can\'t create checkbox element', function () {
            assert.equal(true, ndCheckbox.length);
        });
        it('DataApi doesn\'t work for checkbox', function () {
            assert.equal(1, doggy.dataApi.checkbox.length);
            assert.equal(true, ndCheckbox.data('init'));
        });
        it('Checkbox doesn\'t work', function () {
            assert.equal(undefined, ndCheckbox.attr('checked'));
            assert.equal(false, ndCheckbox.hasClass('checkbox--active'));
            ndCheckbox.trigger('click');
            assert.equal('checked', ndCheckbox.attr('checked'));
            assert.equal(true, ndCheckbox.hasClass('checkbox--active'));
            ndCheckbox.trigger('click');
            assert.equal(undefined, ndCheckbox.attr('checked'));
        });
    });
});
