/**
 * @file tablebutton.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');
    var Popup = require('./popup');
    var TablePicker = require('./tablepicker');
    var SplitButton = require('./splitbutton');

    /**
     * TableButton
     *
     * @param {Object} options Then options.
     * @class
     */
    function TableButton(options) {
        this.initOptions(options);
        this.initTableButton();
    }

    TableButton.prototype = {
        constructor: TableButton,
        initTableButton: function () {
            var me = this;
            this.popup = new Popup({
                content: new TablePicker({
                    editor: me.editor,
                    onpicktable: function (t, numCols, numRows) {
                        me._onPickTable(numCols, numRows);
                    }
                }),
                editor: me.editor
            });
            this.initSplitButton();
        },
        _onPickTable: function (numCols, numRows) {   // eslint-disable-line
            if (this.fireEvent('picktable', numCols, numRows) !== false) {
                this.popup.hide();
            }

        }
    };
    utils.inherits(TableButton, SplitButton);

    return TableButton;
});
