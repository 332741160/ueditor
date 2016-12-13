/**
 * @file menubutton.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');
    var Menu = require('./menu');
    var SplitButton = require('./splitbutton');

    /**
     * MenuButton
     *
     * @param {Object} options The options
     * @class
     */
    function MenuButton(options) {
        this.initOptions(options);
        this.initMenuButton();
    }

    MenuButton.prototype = {
        constructor: MenuButton,
        initMenuButton: function () {
            var me = this;
            this.uiName = 'menubutton';
            this.popup = new Menu({
                items: me.items,
                className: me.className,
                editor: me.editor
            });
            this.popup.addListener('show', function () {
                var list = this;
                for (var i = 0; i < list.items.length; i++) {
                    list.items[i].removeState('checked');
                    if (list.items[i].value === me._value) {
                        list.items[i].addState('checked');
                        this.value = me._value;
                    }

                }
            });
            this.initSplitButton();
        },
        setValue: function (value) {
            this._value = value;
        }
    };
    utils.inherits(MenuButton, SplitButton);

    return MenuButton;
});
