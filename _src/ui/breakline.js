/**
 * @file breakline.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');

    var UIBase = require('./uibase');

    /**
     * Breakline
     *
     * @param {Object} options The options.
     * @class
     */
    function Breakline(options) {
        this.initOptions(options);
        this.initSeparator();
    }
    Breakline.prototype = {
        constructor: Breakline,
        uiName: 'Breakline',
        initSeparator: function () {
            this.initUIBase();
        },
        getHtmlTpl: function () {
            return '<br/>';
        }
    };
    utils.inherits(Breakline, UIBase);
    return Breakline;
});
