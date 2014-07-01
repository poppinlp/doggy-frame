describe('Dialog', function () {
    describe('#initDialog', function () {
        $('body')
            .append('<a href="javascript:void(0);" data-uix="dialog" data-params=\'{"type": "alert", "content": "这是一个alert"}\' class="J-dialog btn">Alert</a>')
            .append('<a href="javascript:void(0);" data-uix="dialog" data-params=\'{"type": "alert", "content": "这是一个红色alert", "color": "red"}\' class="J-dialog btn">Red Alert</a>');

        var nlDialogTrigger = $('.J-dialog');
        it('DataApi doesn\'t work for dialog', function () {
            assert.equal(2, doggy.dataApi.dialog.length);
            assert.equal(2, nlDialogTrigger.filter(function () {
                return $(this).data('init');
            }).length);
        });
        it('Can\'t create dialog element', function () {
            assert.equal(0, $('.dialog').length);
            nlDialogTrigger.eq(0).trigger('click');
            assert.equal(1, $('.dialog').length);
        });
        it('There\'s some problems in dialog render', function () {
            var ndDialog = $('.dialog');
            assert.equal('这是一个alert', ndDialog.find('.dialog__content').html());
            assert.equal('none', ndDialog.find('.dialog__button').css('display'));
            assert.equal('dialog dialog--active', ndDialog.attr('class'));
        });
        it('Dialog close event can\'t work', function () {
            var ndDialog = $('.dialog');
            assert.equal('block', ndDialog.css('display'));
            ndDialog.find('.dialog__close').trigger('click');
            assert.equal('none', ndDialog.css('display'));
        });
        it('There\'s some problems in dialog render again', function () {
            nlDialogTrigger.eq(1).trigger('click');
            var ndDialog = $('.dialog');
            assert.equal('block', ndDialog.css('display'));
            assert.equal('这是一个红色alert', ndDialog.find('.dialog__content').html());
            assert.equal('dialog dialog--red dialog--active', ndDialog.attr('class'));
            ndDialog.find('.dialog__close').trigger('click');
        });
        it('Dialog can\'t work in confirm config', function () {
            var cb = 0,
                ndConfirmTrigger = nlDialogTrigger.eq(0);
            ndConfirmTrigger.data('init', false);
            doggy.initDialog(ndConfirmTrigger, {
                type: 'confirm',
                content: '这是一个confirm',
                callback: function () {
                    cb = 1;
                }
            });
            ndConfirmTrigger.trigger('click');
            var ndDialog = $('.dialog');
            assert.equal('这是一个confirm', ndDialog.find('.dialog__content').html());
            assert.equal('block', ndDialog.css('display'));
            assert.equal('block', ndDialog.find('.dialog__button').css('display'));
            assert.equal(0, cb);
            ndDialog.find('.J-yes').trigger('click');
            assert.equal('none', ndDialog.css('display'));
            assert.equal(1, cb);
        });
        it('Dialog can\'t work in autoHide config', function () {
            var ndConfirmTrigger = nlDialogTrigger.eq(0);

            ndConfirmTrigger.data('init', false);
            doggy.initDialog(ndConfirmTrigger, {
                type: 'alert',
                content: 'test autoHide',
                autoHide: 1000
            });
            var ndDialog = $('.dialog'),
                clock = sinon.useFakeTimers();
            assert.equal('none', ndDialog.css('display'));

            ndConfirmTrigger.trigger('click');
            assert.equal('block', ndDialog.css('display'));

            clock.tick(1100);
            assert.equal('none', ndDialog.css('display'));

            clock.restore();
        });
        it('Dialog can\'t work in IE6', function () {
            /*
            var ndConfirmTrigger = nlDialogTrigger.eq(0),
                ndBody = $('body');

            doggy.ua.ie6 = true;
            ndConfirmTrigger.data('init', false);
            ndBody.remove('.dialog').height(2000);
            doggy.initDialog(ndConfirmTrigger, {
                type: 'alert',
                content: 'test ie6'
            });

            var ndDialog = $('.dialog');
            assert.equal(ndBody.outerHeight(), ndDialog.children('.mask').height());
            assert.equal(ndBody.outerWidth(), ndDialog.children('.mask').width());

            doggy.ua.ie6 = navigator.userAgent.toLowerCase().indexOf('msie 6.0') !== -1;
            */
        });
        it('There should be only one tooltip element', function () {
            assert.equal(1, $('.dialog').length);
        });
    });
});
