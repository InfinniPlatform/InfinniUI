/**
 * @augments ListEditorBase
 * @param parent
 * @constructor
 */
function ComboBox(parent) {
    _.superClass(ComboBox, this, parent);
}

_.inherit(ComboBox, ListEditorBase);

ComboBox.prototype.createControl = function () {
    return new ComboBoxControl();
};

ComboBox.prototype.getLabelText = function () {
    return this.control.get('labelText');
};

ComboBox.prototype.setLabelText = function (value) {
    this.control.set('labelText', value);
};

ComboBox.prototype.setValueTemplate = function (value) {
    this.control.set('valueTemplate', value);
};

ComboBox.prototype.getValueTemplate = function () {
    return this.control.get('valueTemplate');
};

ComboBox.prototype.setValueFormat = function (value) {
    this.control.set('valueFormat', value);
};

ComboBox.prototype.getValueFormat = function () {
    return this.control.get('valueFormat');
};