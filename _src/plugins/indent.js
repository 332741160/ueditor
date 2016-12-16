/**
 * 首行缩进
 * @file
 * @author
 * @since 1.2.6.1
 */

/**
 * 缩进
 * @command indent
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'indent' );
 * ```
 */

define(function (require) {
    var domUtils = require('../core/domUtils');

    // UE.commands['indent'] =
    return {
        execCommand: function () {
            var me = this;
            var value = me.queryCommandState('indent') ? '0em' : (me.options.indentValue || '2em');
            me.execCommand('Paragraph', 'p', {
                style: 'text-indent:' + value
            });
        },
        queryCommandState: function () {
            var pN = domUtils.filterNodeList(this.selection.getStartElementPath(), 'p h1 h2 h3 h4 h5 h6');
            return pN && pN.style.textIndent && parseInt(pN.style.textIndent, 10) ? 1 : 0;
        }

    };
});
