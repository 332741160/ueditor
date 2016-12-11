/**
 * 维护编辑器一下默认的不在插件中的配置项
 * @file Editor.defaultoptions.js
 * @author leeight
 */

define(function (require) {
    var Editor = require('./Editor');

    Editor.defaultOptions = function (editor) {
        var url = editor.options.UEDITOR_HOME_URL;
        return {
            isShow: true,
            initialContent: '',
            initialStyle: '',
            autoClearinitialContent: false,
            iframeCssUrl: url + 'themes/iframe.css',
            textarea: 'editorValue',
            focus: false,
            focusInEnd: true,
            autoClearEmptyNode: true,
            fullscreen: false,
            readonly: false,
            zIndex: 999,
            imagePopup: true,
            enterTag: 'p',
            customDomain: false,
            lang: 'zh-cn',
            langPath: url + 'lang/',
            theme: 'default',
            themePath: url + 'themes/',
            allHtmlEnabled: false,
            scaleEnabled: false,
            tableNativeEditInFF: false,
            autoSyncData: true,
            fileNameFormat: '{time}{rand:6}'
        };
    };

    return Editor;
});
