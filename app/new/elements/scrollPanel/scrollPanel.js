/**
 * @param parent
 * @constructor
 * @augments Container
 */
function ScrollPanel(parent) {
    _.superClass(ScrollPanel, this, parent);
}

_.inherit(ScrollPanel, Container);

ScrollPanel.prototype.getHorizontalScroll = function () {
    return this.control.get('horizontalScroll');
};

ScrollPanel.prototype.setHorizontalScroll = function (value) {
    if (InfinniUI.Metadata.isValidValue(value, ScrollVisibility)) {
        this.control.set('horizontalScroll', value);
    }
};

ScrollPanel.prototype.getVerticalScroll = function () {
    return this.control.get('verticalScroll');
};

ScrollPanel.prototype.setVerticalScroll = function (value) {
    if (InfinniUI.Metadata.isValidValue(value, ScrollVisibility)) {
        this.control.set('verticalScroll', value);
    }
};

/**
 *
 * @returns {PanelControl}
 */
ScrollPanel.prototype.createControl = function () {
    return new ScrollPanelControl();
};