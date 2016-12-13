/**
 * @file colorbutton.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');

    var uiUtils = require('./uiutils');
    var ColorPicker = require('./colorpicker');
    var Popup = require('./popup');
    var SplitButton = require('./splitbutton');

    /**
     * ColorButton
     *
     * @param {Object} options The options.
     * @class
     */
    function ColorButton(options) {
        this.initOptions(options);
        this.initColorButton();
    }

    ColorButton.prototype = {
        constructor: ColorButton,
        initColorButton: function () {
            var me = this;
            this.popup = new Popup({
                content: new ColorPicker({
                    noColorText: me.editor.getLang('clearColor'),
                    editor: me.editor,
                    onpickcolor: function (t, color) {
                        me._onPickColor(color);
                    },
                    onpicknocolor: function (t, color) {
                        me._onPickNoColor(color);
                    }
                }),
                editor: me.editor
            });
            this.initSplitButton();
        },
        _SplitButton_postRender: SplitButton.prototype.postRender,    // eslint-disable-line
        postRender: function () {
            this._SplitButton_postRender();
            this.getDom('button_body').appendChild(
                uiUtils.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')
            );
            this.getDom().className += ' edui-colorbutton';
        },
        setColor: function (color) {
            this.getDom('colorlump').style.backgroundColor = color;
            this.color = color;
        },
        _onPickColor: function (color) {      // eslint-disable-line
            if (this.fireEvent('pickcolor', color) !== false) {
                this.setColor(color);
                this.popup.hide();
            }
        },
        _onPickNoColor: function (color) {    // eslint-disable-line
            if (this.fireEvent('picknocolor') !== false) {
                this.popup.hide();
            }
        }
    };
    utils.inherits(ColorButton, SplitButton);

    return ColorButton;
});
