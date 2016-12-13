/**
 * @file pastepicker.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');
    var domUtils = require('../core/domUtils');
    var Stateful = require('./stateful');
    var uiUtils = require('./uiutils');
    var UIBase = require('./uibase');

    /**
     * PastePicker
     *
     * @param {Object} options The options.
     * @class
     */
    function PastePicker(options) {
        this.initOptions(options);
        this.initPastePicker();
    }

    PastePicker.prototype = {
        constructor: PastePicker,
        initPastePicker: function () {
            this.initUIBase();
            this.Stateful_init();   // eslint-disable-line
        },

        /* eslint-disable */
        getHtmlTpl: function () {
            return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div>' +
                '<div class="edui-pastecontainer">' +
                '<div class="edui-title">' + this.editor.getLang('pasteOpt') + '</div>' +
                '<div class="edui-button">' +
                '<div title="' + this.editor.getLang('pasteSourceFormat') + '" onclick="$$.format(false)" stateful>' +
                '<div class="edui-richtxticon"></div></div>' +
                '<div title="' + this.editor.getLang('tagFormat') + '" onclick="$$.format(2)" stateful>' +
                '<div class="edui-tagicon"></div></div>' +
                '<div title="' + this.editor.getLang('pasteTextFormat') + '" onclick="$$.format(true)" stateful>' +
                '<div class="edui-plaintxticon"></div></div>' +
                '</div>' +
                '</div>' +
                '</div>';
        },

        /* eslint-enable */
        getStateDom: function () {
            return this.target;
        },
        format: function (param) {
            this.editor.ui._isTransfer = true;
            this.editor.fireEvent('pasteTransfer', param);
        },
        _onClick: function (cur) {    // eslint-disable-line
            var node = domUtils.getNextDomNode(cur);
            var screenHt = uiUtils.getViewportRect().height;
            var subPop = uiUtils.getClientRect(node);

            if ((subPop.top + subPop.height) > screenHt) {
                node.style.top = (-subPop.height - cur.offsetHeight) + 'px';
            }
            else {
                node.style.top = '';
            }

            if (/hidden/ig.test(domUtils.getComputedStyle(node, 'visibility'))) {
                node.style.visibility = 'visible';
                domUtils.addClass(cur, 'edui-state-opened');
            }
            else {
                node.style.visibility = 'hidden';
                domUtils.removeClasses(cur, 'edui-state-opened');
            }
        },
        _UIBase_render: UIBase.prototype.render   // eslint-disable-line
    };
    utils.inherits(PastePicker, UIBase);
    utils.extend(PastePicker.prototype, Stateful, true);

    return PastePicker;
});
