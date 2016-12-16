/**
 * 快捷键提交
 * @file
 * @author
 */

/**
 * 提交表单
 * @command autosubmit
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'autosubmit' );
 * ```
 */

define(function (require) {
    var plugin = require('../core/plugin');
    var domUtils = require('../core/domUtils');

    function fn() {
        return {
            shortcutkey: {
                autosubmit: 'ctrl+13' // 手动提交
            },
            commands: {
                autosubmit: {
                    execCommand: function () {
                        var me = this;
                        var form = domUtils.findParentByTagName(me.iframe, 'form', false);
                        if (form) {
                            if (me.fireEvent('beforesubmit') === false) {
                                return;
                            }

                            me.sync();
                            form.submit();
                        }

                    }
                }
            }
        };
    }

    plugin.register('autosubmit', fn);
});
