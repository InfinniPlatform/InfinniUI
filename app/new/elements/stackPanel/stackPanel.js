/**
 * @param parent
 * @constructor
 * @augments Container
 */
function StackPanel(parent) {
    _.superClass(StackPanel, this, parent);
}

_.inherit(StackPanel, Container);

StackPanel.prototype.getOrientation = function () {
    return this.control.get('orientation');
};

StackPanel.prototype.setOrientation = function (value) {
    if (InfinniUI.Metadata.isValidValue(value, StackPanelOrientation)) {
        this.control.set('orientation', value)
    }
};

StackPanel.prototype.createControl = function () {
    return new StackPanelControl();
};