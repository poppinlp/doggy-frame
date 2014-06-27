describe('Dropdown', function () {
    describe('#initDropdown', function () {
        $('body').append([
            '<div class="J-dropdown dropdown" style="width:100px;">',
                '<div class="dropdown__trigger">测试按钮</div>',
                '<ul class="dropdown__content">',
                    '<li><a href="javascript:void(0)">测试下拉菜单</a></li>',
                    '<li><a href="javascript:void(0)">测试下拉菜单</a></li>',
                '</ul>',
            '</div>'
        ].join(''));
        doggy.initDropdown('.J-dropdown');

        var ndDropdown = $('.J-dropdown');
        it('Can\'t create dropdown element', function () {
            assert.equal(true, ndDropdown.length);
        });
        it('Dropdown position wrong', function () {
            assert.equal(ndDropdown.children('.dropdown__content').width(), ndDropdown.outerWidth() - 2);
            assert.equal(ndDropdown.children('.dropdown__content').css('top'), ndDropdown.outerHeight() + 5 + 'px');
        });
        it('Can\'t trigger content display', function () {
            ndDropdown.children('.dropdown__trigger').trigger('click');
            assert.equal('block', ndDropdown.children('.dropdown__content').css('display'));
        });
    });
    describe('#dataApi', function () {
    });
});
