/**
 * 存储媒介封装
 * @file localstorage.js
 * @author leeight
 */

define(function (require) {
    var utils = require('./utils');
    var Editor = require('./Editor');

    var storage = window.localStorage || getUserData() || null;
    var LOCAL_FILE = 'localStorage';
    var ROOTKEY = 'ueditor_preference';

    var LocalStorage = {
        saveLocalData: function (key, data) {   // eslint-disable-line
            if (storage && data) {
                storage.setItem(key, data);
                return true;
            }

            return false;
        },

        getLocalData: function (key) {          // eslint-disable-line
            if (storage) {
                return storage.getItem(key);
            }

            return null;
        },

        removeItem: function (key) {            // eslint-disable-line
            storage && storage.removeItem(key);
        }
    };

    function getUserData() {
        var container = document.createElement('div');
        container.style.display = 'none';

        if (!container.addBehavior) {
            return null;
        }

        container.addBehavior('#default#userdata');

        return {
            getItem: function (key) {
                var result = null;

                try {
                    document.body.appendChild(container);
                    container.load(LOCAL_FILE);
                    result = container.getAttribute(key);
                    document.body.removeChild(container);
                }
                catch (e) {}

                return result;
            },

            setItem: function (key, value) {
                document.body.appendChild(container);
                container.setAttribute(key, value);
                container.save(LOCAL_FILE);
                document.body.removeChild(container);
            },

            // // 暂时没有用到
            // clear: function () {
            //
            //    var expiresTime = new Date();
            //    expiresTime.setFullYear(expiresTime.getFullYear() - 1);
            //    document.body.appendChild(container);
            //    container.expires = expiresTime.toUTCString();
            //    container.save(LOCAL_FILE);
            //    document.body.removeChild(container);
            //
            // },

            removeItem: function (key) {
                document.body.appendChild(container);
                container.removeAttribute(key);
                container.save(LOCAL_FILE);
                document.body.removeChild(container);
            }
        };
    }

    Editor.prototype.setPreferences = function (key, value) {
        var obj = {};
        if (utils.isString(key)) {
            obj[key] = value;
        }
        else {
            obj = key;
        }
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            utils.extend(data, obj);
        }
        else {
            data = obj;
        }
        data && LocalStorage.saveLocalData(ROOTKEY, utils.json2str(data));
    };

    Editor.prototype.getPreferences = function (key) {
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            return key ? data[key] : data;
        }

        return null;
    };

    Editor.prototype.removePreferences = function (key) {
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            data[key] = undefined;
            delete data[key];
        }

        data && LocalStorage.saveLocalData(ROOTKEY, utils.json2str(data));
    };
});
