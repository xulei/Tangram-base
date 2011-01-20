/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */

///import baidu.dom;
///import baidu.dom.setStyles;
///import baidu.dom.getStyle;
///import baidu.dom._styleFilter.px;

///import baidu.browser.isStrict;

/**
 * 按照border-box模型设置元素的height和width值
 * 只支持元素的padding/border/height/width使用同一种计量单位的情况。
 * 不支持：
 * 1. 非数字值(medium)
 * 2. em/px在不同的属性中混用
 * @name baidu.dom.setBorderBoxSize
 * @author berg
 * @function
 * @grammar baidu.dom.setBorderBoxSize(element, size)
 * @param {HTMLElement|string} element 元素或DOM元素的id
 * @param {object} size 包含height和width键名的对象
 *
 * @see baidu.dom.setBorderBoxWidth, baidu.dom.setBorderBoxHeight
 *
 * @return {HTMLElement}  设置好的元素
 */
baidu.dom.setBorderBoxSize= function (element, size) {
    var result = {};
    function getNumericalStyle(element, name){
        return parseFloat(baidu.getStyle(element, name)) || 0;
    }
    
    if(baidu.browser.isStrict){
        if(size.width){
            result.width = size.width  -
                           getNumericalStyle(element, 'paddingLeft') - 
                           getNumericalStyle(element, 'paddingRight') - 
                           getNumericalStyle(element, 'borderLeftWidth') -
                           getNumericalStyle(element, 'borderRightWidth');
        }
        if(size.height){
            result.height = size.height -
                            getNumericalStyle(element, 'paddingTop') - 
                            getNumericalStyle(element, 'paddingBottom') - 
                            getNumericalStyle(element, 'borderTopWidth') - 
                            getNumericalStyle(element, 'borderBottomWidth');
        }
    }
    return baidu.dom.setStyles(element, result);
};