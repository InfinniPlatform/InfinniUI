function DatePicker(parent) {
    _.superClass(DatePicker, this, parent);

    this.setMode('DatePicker');
    this.setTimeZone();
}

_.inherit(DatePicker, DateTimePicker);

DatePicker.prototype.setTimeZone = function () {
    DateTimePicker.prototype.setTimeZone.call(this, 0);
};

DatePicker.prototype.createControl = function (parent) {
    return new DatePickerControl(parent);
};

DatePicker.prototype.convertValue = function (value) {
    var _value = null;

    if(typeof value === 'undefined' || value === null || !value.toString().length) {
        _value = null;
    } else {
        _value = InfinniUI.DateUtils.dateToTimestamp(value);
    }

    return _value;
};