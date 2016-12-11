/**
 * @file plugin.js
 * @author campaign
 */

define(function (require) {
    var utils = require('./utils');

    var _plugins = {};    // eslint-disable-line

    function register(pluginName, fn, oldOptionName, afterDisabled) {
        if (oldOptionName && utils.isFunction(oldOptionName)) {
            afterDisabled = oldOptionName;
            oldOptionName = null;
        }

        _plugins[pluginName] = {
            optionName: oldOptionName || pluginName,
            execFn: fn,
            // 当插件被禁用时执行
            afterDisabled: afterDisabled
        };
    }

    function load(editor) {
        utils.each(_plugins, function (plugin) {
            var _export = plugin.execFn.call(editor);   // eslint-disable-line
            if (editor.options[plugin.optionName] !== false) {
                if (_export) {
                    // 后边需要再做扩展
                    utils.each(_export, function (v, k) {
                        switch (k.toLowerCase()) {
                            case 'shortcutkey':
                                editor.addshortcutkey(v);
                                break;
                            case 'bindevents':
                                utils.each(v, function (fn, eventName) {    // eslint-disable-line
                                    editor.addListener(eventName, fn);
                                });
                                break;
                            case 'bindmultievents':
                                utils.each(utils.isArray(v) ? v : [v], function (event) {   // eslint-disable-line
                                    var types = utils.trim(event.type).split(/\s+/);
                                    utils.each(types, function (eventName) {    // eslint-disable-line
                                        editor.addListener(eventName, event.handler);
                                    });
                                });
                                break;
                            case 'commands':
                                utils.each(v, function (execFn, execName) {   // eslint-disable-line
                                    editor.commands[execName] = execFn;
                                });
                                break;
                            case 'outputrule':
                                editor.addOutputRule(v);
                                break;
                            case 'inputrule':
                                editor.addInputRule(v);
                                break;
                            case 'defaultoptions':
                                editor.setOpt(v);
                        }
                    });
                }
            }
            else if (plugin.afterDisabled) {
                plugin.afterDisabled.call(editor);
            }

        });
        // 向下兼容
        utils.each(plugins, function (plugin) {
            plugin.call(editor);
        });
    }

    function run(pluginName, editor) {
        var plugin = _plugins[pluginName];
        if (plugin) {
            plugin.exeFn.call(editor);
        }
    }

    return {
        register: register,
        load: load,
        run: run
    };
});
