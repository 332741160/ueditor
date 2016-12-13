/**
 * @file stateful.js
 * @author leeight
 */

define(function (require) {
    var browser = require('../core/browser');
    var domUtils = require('../core/domUtils');

    var uiUtils = require('./uiutils');

    var TPL_STATEFUL = 'onmousedown="$$.Stateful_onMouseDown(event, this);"'
    + ' onmouseup="$$.Stateful_onMouseUp(event, this);"'
    + (browser.ie ? (' onmouseenter="$$.Stateful_onMouseEnter(event, this);"'
        + ' onmouseleave="$$.Stateful_onMouseLeave(event, this);"')
        : (' onmouseover="$$.Stateful_onMouseOver(event, this);"'
        + ' onmouseout="$$.Stateful_onMouseOut(event, this);"'));

    var stateful = {
        alwalysHoverable: false,
        target: null, // 目标元素和this指向dom不一样
        Stateful_init: function () {    // eslint-disable-line
            this._Stateful_dGetHtmlTpl = this.getHtmlTpl;   // eslint-disable-line
            this.getHtmlTpl = this.Stateful_getHtmlTpl;
        },
        Stateful_getHtmlTpl: function () {    // eslint-disable-line
            var tpl = this._Stateful_dGetHtmlTpl();
            // 使用function避免$转义
            return tpl.replace(/stateful/g, function () {
                return TPL_STATEFUL;
            });
        },
        Stateful_onMouseEnter: function (evt, el) {   // eslint-disable-line
            this.target = el;
            if (!this.isDisabled() || this.alwalysHoverable) {
                this.addState('hover');
                this.fireEvent('over');
            }
        },
        Stateful_onMouseLeave: function (evt, el) {   // eslint-disable-line
            if (!this.isDisabled() || this.alwalysHoverable) {
                this.removeState('hover');
                this.removeState('active');
                this.fireEvent('out');
            }

        },
        Stateful_onMouseOver: function (evt, el) {    // eslint-disable-line
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseEnter(evt, el);  // eslint-disable-line
            }
        },
        Stateful_onMouseOut: function (evt, el) {     // eslint-disable-line
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseLeave(evt, el);  // eslint-disable-line
            }
        },
        Stateful_onMouseDown: function (evt, el) {    // eslint-disable-line
            if (!this.isDisabled()) {
                this.addState('active');
            }

        },
        Stateful_onMouseUp: function (evt, el) {      // eslint-disable-line
            if (!this.isDisabled()) {
                this.removeState('active');
            }

        },
        Stateful_postRender: function () {            // eslint-disable-line
            if (this.disabled && !this.hasState('disabled')) {
                this.addState('disabled');
            }

        },
        hasState: function (state) {
            return domUtils.hasClass(this.getStateDom(), 'edui-state-' + state);
        },
        addState: function (state) {
            if (!this.hasState(state)) {
                this.getStateDom().className += ' edui-state-' + state;
            }

        },
        removeState: function (state) {
            if (this.hasState(state)) {
                domUtils.removeClasses(this.getStateDom(), ['edui-state-' + state]);
            }

        },
        getStateDom: function () {
            return this.getDom('state');
        },
        isChecked: function () {
            return this.hasState('checked');
        },
        setChecked: function (checked) {
            if (!this.isDisabled() && checked) {
                this.addState('checked');
            }
            else {
                this.removeState('checked');
            }
        },
        isDisabled: function () {
            return this.hasState('disabled');
        },
        setDisabled: function (disabled) {
            if (disabled) {
                this.removeState('hover');
                this.removeState('checked');
                this.removeState('active');
                this.addState('disabled');
            }
            else {
                this.removeState('disabled');
            }
        }
    };

    return stateful;
});
