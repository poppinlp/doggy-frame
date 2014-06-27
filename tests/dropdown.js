describe('Dropdown', function () {
    describe('#initDropdown', function () {
        $('body').append([
            '<div data-uix="dropdown" class="J-dropdown dropdown" style="width:100px;">',
                '<div class="dropdown__trigger">测试按钮</div>',
                '<ul class="dropdown__content">',
                    '<li><a href="javascript:void(0)">测试下拉菜单</a></li>',
                    '<li><a href="javascript:void(0)">测试下拉菜单</a></li>',
                '</ul>',
            '</div>'
        ].join(''));

        var ndDropdown = $('.J-dropdown');
        it('Can\'t create dropdown element', function () {
            assert.equal(true, ndDropdown.length);
        });
        it('DataApi doesn\'t work for dropdown', function () {
            assert.equal(1, doggy.dataApi.dropdown.length);
            assert.equal(true, ndDropdown.data('init'));
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
});
