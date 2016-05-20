/**
 * @param parent
 * @constructor
 * @augments Container
 */
function StackPanel(parent, viewMode) {
    _.superClass(StackPanel, this, parent, viewMode);
}

_.inherit(StackPanel, Container);

StackPanel.prototype.getOrientation = function () {
    return this.control.get('orientation');
};

StackPanel.prototype.setOrientation = function (value) {
    if (InfinniUI.Metadata.isValidValue(value, InfinniUI.StackPanelOrientation)) {
        this.control.set('orientation', value)
    }
};

StackPanel.prototype.createControl = function (viewMode) {
    return new StackPanelControl(viewMode);
};