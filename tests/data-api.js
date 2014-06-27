describe('dataApi', function () {
    it('No dataApi object', function () {
        $(document).ready(function() {
            assert.equal('object', typeof doggy.dataApi);
        });
    });
});
