describe('UA', function () {
    describe('#webkit', function () {
        it('PhantomJS should be webkit', function () {
            assert.equal(true, doggy.ua.webkit);
        });
    });
    describe('#msie', function () {
        it('PhantomJS should not be msie', function () {
            assert.equal(false, doggy.ua.msie);
        });
    });
    describe('#ie6', function () {
        it('PhantomJS should not be ie6', function () {
            assert.equal(false, doggy.ua.ie6);
        });
    });
});
