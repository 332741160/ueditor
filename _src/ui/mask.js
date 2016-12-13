/**
 * @file mask.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');
    var domUtils = require('../core/domUtils');
    var UIBase = require('./uibase');
    var uiUtils = require('./uiutils');

    /**
     * Mask
     *
     * @param {Object} options The options.
     * @class
     */
    function Mask(options) {
        this.initOptions(options);
        this.initUIBase();
    }

    Mask.prototype = {
        constructor: Mask,

        /* eslint-disable */
        getHtmlTpl: function () {
            return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>';
        },

        /* eslint-enable */
        postRender: function () {
            var me = this;
            domUtils.on(window, 'resize', function () {
                setTimeout(function () {
                    if (!me.isHidden()) {
                        me._fill();
                    }

                });
            });
        },
        show: function (zIndex) {
            this._fill();
            this.getDom().style.display = '';
            this.getDom().style.zIndex = zIndex;
        },
        hide: function () {
            this.getDom().style.display = 'none';
            this.getDom().style.zIndex = '';
        },
        isHidden: function () {
            return this.getDom().style.display === 'none';
        },
        _onMouseDown: function () {   // eslint-disable-line
            return false;
        },
        _onClick: function (e, target) {    // eslint-disable-line
            this.fireEvent('click', e, target);
        },
        _fill: function () {    // eslint-disable-line
            var el = this.getDom();
            var vpRect = uiUtils.getViewportRect();
            el.style.width = vpRect.width + 'px';
            el.style.height = vpRect.height + 'px';
        }
    };
    utils.inherits(Mask, UIBase);

    return Mask;
});
