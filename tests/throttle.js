describe('Throttle', function () {
    it('Throttle doesn\'t work', function () {
        var clock = sinon.useFakeTimers(),
            times = 0,
            interval = setInterval(doggy.throttle(function () { times++; }, 100), 10);

        clock.tick(350);
        assert.equal(4, times);

        clock.restore();
    });
});
