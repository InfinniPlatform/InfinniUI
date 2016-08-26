/**
 * @augments ListEditorBase
 * @param parent
 * @constructor
 * @mixes labelTextElementMixin
 */
function ComboBox(parent) {
    _.superClass(ComboBox, this, parent);
}

window.InfinniUI.ComboBox = ComboBox;

_.inherit(ComboBox, ListEditorBase);

_.extend(ComboBox.prototype, labelTextElementMixin);

ComboBox.prototype.createControl = function () {
    return new ComboBoxControl();
};

ComboBox.prototype.setValueTemplate = function (value) {
    this.control.set('valueTemplate', value);
};

ComboBox.prototype.getValueTemplate = function () {
    return this.control.get('valueTemplate');
};

ComboBox.prototype.getAutocomplete = function () {
    return this.control.get('autocomplete');
};

ComboBox.prototype.setAutocomplete = function (value) {
    if (typeof value === 'boolean') {
        this.control.set('autocomplete', value);
    }
};

ComboBox.prototype.setShowClear = function (value) {
    if (typeof value === 'boolean') {
        this.control.set('showClear', value);
    }
};

ComboBox.prototype.getShowClear = function () {
    return this.control.get('showClear');
};

ComboBox.prototype.getAutocompleteValue = function () {
    return this.control.get('autocompleteValue');
};

ComboBox.prototype.setAutocompleteValue = function (value) {
    this.control.set('autocompleteValue', value);
};

