/**
 * @file toolbar.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');
    var uiUtils = require('./uiutils');
    var UIBase = require('./uibase');

    /**
     * Toolbar
     *
     * @param {*} options The options.
     * @class
     */
    function Toolbar(options) {
        this.initOptions(options);
        this.initToolbar();
    }

    Toolbar.prototype = {
        constructor: Toolbar,
        items: null,
        initToolbar: function () {
            this.items = this.items || [];
            this.initUIBase();
        },
        add: function (item, index) {
            if (index === undefined) {
                this.items.push(item);
            }
            else {
                this.items.splice(index, 0, item);
            }

        },
        getHtmlTpl: function () {
            var buff = [];
            for (var i = 0; i < this.items.length; i++) {
                buff[i] = this.items[i].renderHtml();
            }
            /* eslint-disable */
            return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">'
                + buff.join('')
                + '</div>';
            /* eslint-enable */
        },
        postRender: function () {
            var box = this.getDom();
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].postRender();
            }
            uiUtils.makeUnselectable(box);
        },
        _onMouseDown: function (e) {    // eslint-disable-line
            var target = e.target || e.srcElement;
            var tagName = target && target.tagName && target.tagName.toLowerCase();
            if (tagName === 'input' || tagName === 'object' || tagName === 'object') {
                return false;
            }

        }
    };
    utils.inherits(Toolbar, UIBase);

    return Toolbar;
});
