/**
 * 清空文档插件
 * @file
 * @author
 */

/**
 * 清空文档
 * @command cleardoc
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * //editor 是编辑器实例
 * editor.execCommand('cleardoc');
 * ```
 */

define(function (require) {
    var browser = require('../core/browser');
    var ie = browser.ie;

    // UE.commands['cleardoc'] =
    return {
        execCommand: function (cmdName) {
            var me = this;
            var enterTag = me.options.enterTag;
            var range = me.selection.getRange();
            if (enterTag === 'br') {
                me.body.innerHTML = '<br/>';
                range.setStart(me.body, 0).setCursor();
            }
            else {
                me.body.innerHTML = '<p>' + (ie ? '' : '<br/>') + '</p>';
                range.setStart(me.body.firstChild, 0).setCursor(false, true);
            }
            setTimeout(function () {
                me.fireEvent('clearDoc');
            }, 0);

        }
    };

});
