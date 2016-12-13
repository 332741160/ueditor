/**
 * @file separator.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');
    var UIBase = require('./uibase');

    /**
     * Separator
     *
     * @param {Object} options Then options.
     * @class
     */
    function Separator(options) {
        this.initOptions(options);
        this.initSeparator();
    }

    Separator.prototype = {
        constructor: Separator,
        uiName: 'separator',
        initSeparator: function () {
            this.initUIBase();
        },
        getHtmlTpl: function () {
            return '<div id="##" class="edui-box %%"></div>';
        }
    };
    utils.inherits(Separator, UIBase);

    return Separator;
});
