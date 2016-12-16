/**
 * @author
 * @file
 */

define(function (require) {
    var browser = require('../core/browser');

    // UE.commands['scrawl'] =
    return {
        queryCommandState: function () {
            return (browser.ie && browser.version <= 8) ? -1 : 0;
        }
    };
});
