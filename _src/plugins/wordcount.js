/**
 * @author
 * @file
 */

define(function (require) {
    var domUtils = require('../core/domUtils');
    // UE.plugins['wordcount'] =

    return function () {
        var me = this;
        me.setOpt('wordCount', true);
        me.addListener('contentchange', function () {
            me.fireEvent('wordcount');
        });
        var timer;
        me.addListener('ready', function () {
            var me = this;
            domUtils.on(me.body, 'keyup', function (evt) {
                var code = evt.keyCode || evt.which;
                var ignores = {
                        16: 1,
                        18: 1,
                        20: 1,
                        37: 1,
                        38: 1,
                        39: 1,
                        40: 1
                    };
                if (code in ignores) {
                    return;
                }

                clearTimeout(timer);
                timer = setTimeout(function () {
                    me.fireEvent('wordcount');
                }, 200);
            });
        });
    };
});
