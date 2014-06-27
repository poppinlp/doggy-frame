describe('Cookie', function () {
    describe('#setCookie', function () {
        it('There\'s some problems in setCookie', function () {
            doggy.setCookie('doggy', 'doggy', 36500);
            assert.equal(true, document.cookie.indexOf('doggy=doggy') !== -1);
        });
    });
    describe('#getCookie', function () {
        it('There\'s some problems in getCookie', function () {
            assert.equal('doggy', doggy.getCookie('doggy'));
        });
    });
});
