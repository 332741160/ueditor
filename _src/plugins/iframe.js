/**
 * @file iframe.js
 * @author
 */

define(function (require) {
    // UE.plugins['insertframe'] =
    return function () {
        var me = this;

        function deleteIframe() {
            me._iframe && delete me._iframe;
        }

        me.addListener('selectionchange', function () {
            deleteIframe();
        });

    };
});
