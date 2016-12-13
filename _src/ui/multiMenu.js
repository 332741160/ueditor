/**
 * @file multiMenu.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');
    var Popup = require('./popup');
    var SplitButton = require('./splitbutton');

    /**
     * MultiMenuPop
     *
     * @param {Object} options The options
     * @class
     */
    function MultiMenuPop(options) {
        this.initOptions(options);
        this.initMultiMenu();
    }

    MultiMenuPop.prototype = {
        constructor: MultiMenuPop,
        initMultiMenu: function () {
            var me = this;
            this.popup = new Popup({
                content: '',
                editor: me.editor,
                iframe_rendered: false,   // eslint-disable-line
                onshow: function () {
                    if (!this.iframe_rendered) {
                        this.iframe_rendered = true;    // eslint-disable-line
                        this.getDom('content').innerHTML
                            = '<iframe id="' + me.id + '_iframe" src="' + me.iframeUrl + '" frameborder="0"></iframe>';
                        me.editor.container.style.zIndex
                            && (this.getDom().style.zIndex = me.editor.container.style.zIndex * 1 + 1);
                    }
                }
                // canSideUp:false,
                // canSideLeft:false
            });
            this.onbuttonclick = function () {
                this.showPopup();
            };
            this.initSplitButton();
        }
    };

    utils.inherits(MultiMenuPop, SplitButton);

    return MultiMenuPop;
});
