describe('position', function () {
    describe('#initPosition', function () {
        $('body').append([
            '<div class="J-target" style="position:absolute;top:100px;width:100px;height:100px;width:100px;"></div>',
            '<div class="J-self" style="position:absolute;height:50px;width:50px;"></div>'
        ].join(''));

        it('Position tl not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'tl',
                offset: 10
            });
            assert.equal(40 + 'px', $('.J-self').css('top'));
            assert.equal(100 + 'px', $('.J-self').css('left'));
        });
        it('Position tc not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'tc',
                offset: 10
            });
            assert.equal(40 + 'px', $('.J-self').css('top'));
            assert.equal(125 + 'px', $('.J-self').css('left'));
        });
        it('Position tr not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'tr',
                offset: 10
            });
            assert.equal(40 + 'px', $('.J-self').css('top'));
            assert.equal(150 + 'px', $('.J-self').css('left'));
        });
        it('Position rt not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'rt',
                offset: 10
            });
            assert.equal(100 + 'px', $('.J-self').css('top'));
            assert.equal(210 + 'px', $('.J-self').css('left'));
        });
        it('Position rc not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'rc',
                offset: 10
            });
            assert.equal(125 + 'px', $('.J-self').css('top'));
            assert.equal(210 + 'px', $('.J-self').css('left'));
        });
        it('Position rb not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'rb',
                offset: 10
            });
            assert.equal(150 + 'px', $('.J-self').css('top'));
            assert.equal(210 + 'px', $('.J-self').css('left'));
        });
        it('Position br not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'br',
                offset: 10
            });
            assert.equal(210 + 'px', $('.J-self').css('top'));
            assert.equal(150 + 'px', $('.J-self').css('left'));
        });
        it('Position bc not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'bc',
                offset: 10
            });
            assert.equal(210 + 'px', $('.J-self').css('top'));
            assert.equal(125 + 'px', $('.J-self').css('left'));
        });
        it('Position bl not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'bl',
                offset: 10
            });
            assert.equal(210 + 'px', $('.J-self').css('top'));
            assert.equal(100 + 'px', $('.J-self').css('left'));
        });
        it('Position lb not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'lb',
                offset: 10
            });
            assert.equal(150 + 'px', $('.J-self').css('top'));
            assert.equal(40 + 'px', $('.J-self').css('left'));
        });
        it('Position lc not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'lc',
                offset: 10
            });
            assert.equal(125 + 'px', $('.J-self').css('top'));
            assert.equal(40 + 'px', $('.J-self').css('left'));
        });
        it('Position lt not work', function () {
            doggy.initPosition({
                selSelf: '.J-self',
                selTarget: '.J-target',
                position: 'lt',
                offset: 10
            });
            assert.equal(100 + 'px', $('.J-self').css('top'));
            assert.equal(40 + 'px', $('.J-self').css('left'));
        });
    });
});
