/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBase
 */
function DateTimePicker(parent) {
    _.superClass(DateTimePicker, this, parent);
}

window.InfinniUI.DateTimePicker = DateTimePicker;

_.inherit(DateTimePicker, TextEditorBase);

DateTimePicker.prototype.createControl = function (parent) {
    return new DateTimePickerControl(parent);
};

DateTimePicker.prototype.getMinValue = function () {
    return this.control.get('minValue');
};

DateTimePicker.prototype.setMinValue = function (value) {
    this.control.set('minValue', value);
};

DateTimePicker.prototype.getMaxValue = function () {
    return this.control.get('maxValue');
};

DateTimePicker.prototype.setMaxValue = function (value) {
    this.control.set('maxValue', value);
};

DateTimePicker.prototype.getMode = function () {
    return this.control.get('mode');
};

DateTimePicker.prototype.setMode = function (value) {
    this.control.set('mode', value);
};

DateTimePicker.prototype.getTimeZone = function () {
    return this.control.get('timeZone');
};

DateTimePicker.prototype.setTimeZone = function (value) {
    if (_.isNumber(value)) {
        this.control.set('timeZone', value);
    }
};

DateTimePicker.prototype.setDateFormat = function (value) {
    this.control.set('format', value);
};



