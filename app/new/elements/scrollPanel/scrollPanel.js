/**
 * @param parent
 * @constructor
 * @augments Container
 */
function ScrollPanel(parent) {
    _.superClass(ScrollPanel, this, parent);
}

_.inherit(ScrollPanel, Container);

/**
 * @description Возвращает видимость полосы прокрутки по горизонтали
 * @returns {*}
 */
ScrollPanel.prototype.getHorizontalScroll = function () {
    return this.control.get('horizontalScroll');
};

/**
 * @description Устанавливает видимость полосы прокрутки по горизонтали
 * @param value
 */
ScrollPanel.prototype.setHorizontalScroll = function (value) {
    if (InfinniUI.Metadata.isValidValue(value, ScrollVisibility)) {
        this.control.set('horizontalScroll', value);
    }
};

/**
 * @description Возвращает видимость полосы прокрутки по вертикали
 * @returns {*}
 */
ScrollPanel.prototype.getVerticalScroll = function () {
    return this.control.get('verticalScroll');
};

/**
 * @description Устанавливает видимость полосы прокрутки по вертикали
 * @param value
 */
ScrollPanel.prototype.setVerticalScroll = function (value) {
    if (InfinniUI.Metadata.isValidValue(value, ScrollVisibility)) {
        this.control.set('verticalScroll', value);
    }
};

/**
 * @protected
 * @returns {PanelControl}
 */
ScrollPanel.prototype.createControl = function () {
    return new ScrollPanelControl();
};