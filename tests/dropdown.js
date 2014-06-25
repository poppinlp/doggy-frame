describe('Dropdown', function () {
    describe('#initDropdown', function () {
        $('body').append([
            '<div class="dropdown" style="width:100px;position:relative;">',
                '<div class="dropdown__trigger">测试按钮</div>',
                '<ul class="dropdown__content" style="position:absolute;display:none;">',
                    '<li><a href="javascript:void(0)">测试下拉菜单</a></li>',
                    '<li><a href="javascript:void(0)">测试下拉菜单</a></li>',
                '</ul>',
            '</div>'
        ].join(''));
        doggy.initDropdown('.dropdown');

        var ndDropdown = $('.dropdown');
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
});
