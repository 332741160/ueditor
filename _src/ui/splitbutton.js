/**
 * @file splitbutton.js
 * @author leeight
 */

define(function (require) {
    var utils = require('../core/utils');

    var uiUtils = require('./uiutils');
    var UIBase = require('./uibase');
    var Stateful = require('./stateful');

    /**
     * SplitButton
     *
     * @param {Object} options The options.
     * @class
     */
    function SplitButton(options) {
        this.initOptions(options);
        this.initSplitButton();
    }

    SplitButton.prototype = {
        constructor: SplitButton,
        popup: null,
        uiName: 'splitbutton',
        title: '',
        initSplitButton: function () {
            this.initUIBase();
            this.Stateful_init();   // eslint-disable-line
            if (this.popup != null) {
                var popup = this.popup;
                this.popup = null;
                this.setPopup(popup);
            }
        },
        _UIBase_postRender: UIBase.prototype.postRender,      // eslint-disable-line
        postRender: function () {
            this.Stateful_postRender();   // eslint-disable-line
            this._UIBase_postRender();    // eslint-disable-line
        },
        setPopup: function (popup) {
            if (this.popup === popup) {
                return;
            }

            if (this.popup != null) {
                this.popup.dispose();
            }

            popup.addListener('show', utils.bind(this._onPopupShow, this));
            popup.addListener('hide', utils.bind(this._onPopupHide, this));
            popup.addListener('postrender', utils.bind(function () {
                popup.getDom('body').appendChild(
                    uiUtils.createElementByHtml('<div id="'
                        + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:'
                        + (uiUtils.getClientRect(this.getDom()).width + 20) + 'px"></div>')
                );
                popup.getDom().className += ' ' + this.className;
            }, this));
            this.popup = popup;
        },
        _onPopupShow: function () {   // eslint-disable-line
            this.addState('opened');
        },
        _onPopupHide: function () {   // eslint-disable-line
            this.removeState('opened');
        },
        /* eslint-disable */
        getHtmlTpl: function () {
            return '<div id="##" class="edui-box %%">'
                + '<div ' + (this.title ? 'title="' + this.title + '"' : '') + ' id="##_state" stateful><div class="%%-body">'
                + '<div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);">'
                + '<div class="edui-box edui-icon"></div>'
                + '</div>'
                + '<div class="edui-box edui-splitborder"></div>'
                + '<div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div>'
                + '</div></div></div>';
        },
        /* eslint-enable */
        showPopup: function () {
            // 当popup往上弹出的时候，做特殊处理
            var rect = uiUtils.getClientRect(this.getDom());
            rect.top -= this.popup.SHADOW_RADIUS;
            rect.height += this.popup.SHADOW_RADIUS;
            this.popup.showAnchorRect(rect);
        },
        _onArrowClick: function (event, el) {   // eslint-disable-line
            if (!this.isDisabled()) {
                this.showPopup();
            }
        },
        _onButtonClick: function () {   // eslint-disable-line
            if (!this.isDisabled()) {
                this.fireEvent('buttonclick');
            }
        }
    };
    utils.inherits(SplitButton, UIBase);
    utils.extend(SplitButton.prototype, Stateful, true);

    return SplitButton;
});
