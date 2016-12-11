/**
 * UE过滤节点的静态方法
 * @file filternode.js
 * @author leeight
 */

/**
 * 根据传入节点和过滤规则过滤相应节点
 * @module UE
 * @since 1.2.6.1
 * @method filterNode
 * @param { Object } root 指定root节点
 * @param { Object } rules 过滤规则json对象
 * @example
 * ```javascript
 * UE.filterNode(root,editor.options.filterRules);
 * ```
 */

define(function (require) {
    var utils = require('./utils');
    var dtd = require('./dtd');

    function filterNode(node, rules) {
        switch (node.type) {
            case 'text':
                break;
            case 'element':
                var val;
                if (val = rules[node.tagName]) {
                    if (val === '-') {
                        node.parentNode.removeChild(node);
                    }
                    else if (utils.isFunction(val)) {
                        var i;
                        var ci;
                        var parentNode = node.parentNode;
                        var index = node.getIndex();
                        val(node);
                        if (node.parentNode) {
                            if (node.children) {
                                for (i = 0; ci = node.children[i];) {
                                    filterNode(ci, rules);
                                    if (ci.parentNode) {    // eslint-disable-line
                                        i++;
                                    }

                                }
                            }
                        }
                        else {
                            for (i = index; ci = parentNode.children[i];) {
                                filterNode(ci, rules);
                                if (ci.parentNode) {
                                    i++;
                                }

                            }
                        }
                    }
                    else {
                        var attrs = val.$;
                        if (attrs && node.attrs) {
                            var tmpAttrs = {};
                            var tmpVal;
                            for (var a in attrs) {    // eslint-disable-line
                                tmpVal = node.getAttr(a);
                                // todo 只先对style单独处理
                                if (a === 'style' && utils.isArray(attrs[a])) {
                                    var tmpCssStyle = [];
                                    utils.each(attrs[a], function (v) {   // eslint-disable-line
                                        var tmp;
                                        if (tmp = node.getStyle(v)) {
                                            tmpCssStyle.push(v + ':' + tmp);
                                        }

                                    });
                                    tmpVal = tmpCssStyle.join(';');
                                }

                                if (tmpVal) {
                                    tmpAttrs[a] = tmpVal;
                                }

                            }
                            node.attrs = tmpAttrs;
                        }

                        if (node.children) {
                            for (i = 0; ci = node.children[i];) {
                                filterNode(ci, rules);
                                if (ci.parentNode) {
                                    i++;
                                }

                            }
                        }
                    }
                }
                else {
                    // 如果不在名单里扣出子节点并删除该节点,cdata除外
                    if (dtd.$cdata[node.tagName]) {
                        node.parentNode.removeChild(node);
                    }
                    else {
                        parentNode = node.parentNode;
                        index = node.getIndex();
                        node.parentNode.removeChild(node, true);
                        for (i = index, ci; ci = parentNode.children[i];) {
                            filterNode(ci, rules);
                            if (ci.parentNode) {
                                i++;
                            }

                        }
                    }
                }
                break;
            case 'comment':
                node.parentNode.removeChild(node);
        }
    }
    return function (root, rules) {
        if (utils.isEmptyObject(rules)) {
            return root;
        }

        var val;
        if (val = rules['-']) {
            utils.each(val.split(' '), function (k) {
                rules[k] = '-';
            });
        }

        for (var i = 0, ci; ci = root.children[i];) {
            filterNode(ci, rules);
            if (ci.parentNode) {
                i++;
            }

        }
        return root;
    };
});
