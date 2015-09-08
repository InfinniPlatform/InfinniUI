/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBase
 */
function DatePicker(parent) {
    _.superClass(DatePicker, this, parent);
}

_.inherit(DatePicker, TextEditorBase);

DatePicker.prototype.createControl = function (parent) {
    return new DatePickerControl(parent);
};

DatePicker.prototype.getMinValue = function () {
    return this.control.get('minValue');
};

DatePicker.prototype.setMinValue = function (value) {
    this.control.set('minValue', value);
};

DatePicker.prototype.getMaxValue = function () {
    return this.control.get('maxValue');
};

DatePicker.prototype.setMaxValue = function (value) {
    this.control.set('maxValue', value);
};

DatePicker.prototype.getMode = function () {
    return this.control.get('mode');
};

DatePicker.prototype.setMode = function (value) {
    this.control.set('mode', value);
};

DatePicker.prototype.setDateFormat = function (value) {
    this.control.set('format', value);
};


