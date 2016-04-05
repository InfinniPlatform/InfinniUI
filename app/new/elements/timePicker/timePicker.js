function TimePicker(parent) {
    _.superClass(TimePicker, this, parent);
}

_.inherit(TimePicker, DateTimePicker);

TimePicker.prototype.createControl = function (parent) {
    return new TimePickerControl(parent);
};