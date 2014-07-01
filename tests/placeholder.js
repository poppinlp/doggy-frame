describe('Placeholder', function () {
    describe('#initPlaceholder', function () {
        $('body').append('<input class="J-placeholder" type="text" data-uix="placeholder" placeholder="placeholder" />');
        it('DataApi doesn\'t work for placeholder in Chrome', function () {
            assert.equal(1, doggy.dataApi.placeholder.length);
            assert.equal(undefined, $('.J-placeholder').data('init'));
        });
        it('Placeholder doesn\'t work for IE in focus config', function () {
            var stub = sinon.stub(document, 'createElement', function () { return {}; }),
                ndPlaceholder = $('.J-placeholder'),
                placeholder = ndPlaceholder.attr('placeholder');

            doggy.initPlaceholder(ndPlaceholder);
            assert.equal(placeholder, ndPlaceholder.val());
            assert.equal('rgb(153, 153, 153)', ndPlaceholder.css('color'));
            ndPlaceholder.trigger('focus');
            assert.equal('', ndPlaceholder.val());
            assert.equal('rgb(0, 0, 0)', ndPlaceholder.css('color'));
            ndPlaceholder.trigger('blur');
            assert.equal(placeholder, ndPlaceholder.val());
            assert.equal('rgb(153, 153, 153)', ndPlaceholder.css('color'));
            stub.restore();
        });
        it('Placeholder doesn\'t work for IE in change config', function () {
            var stub = sinon.stub(document, 'createElement', function () { return {}; }),
                ndPlaceholder = $('.J-placeholder'),
                placeholder = ndPlaceholder.attr('placeholder');

            ndPlaceholder.data('init', false);
            doggy.initPlaceholder(ndPlaceholder, { hide: 'change' });
            ndPlaceholder.val(placeholder + 'a').trigger('keyup');
            assert.equal('rgb(0, 0, 0)', ndPlaceholder.css('color'));
            assert.equal('a', ndPlaceholder.val());
            ndPlaceholder.val('').trigger('keyup');
            assert.equal('rgb(153, 153, 153)', ndPlaceholder.css('color'));
            assert.equal(placeholder, ndPlaceholder.val());
            stub.restore();
        });
    });
});
