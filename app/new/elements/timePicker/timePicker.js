function TimePicker(parent) {
    _.superClass(TimePicker, this, parent);

    this.setMode('TimePicker');
    this.setTimeZone();
}

_.inherit(TimePicker, DateTimePicker);


TimePicker.prototype.createControl = function (parent) {
    return new TimePickerControl(parent);
};

TimePicker.prototype.setTimeZone = function () {
    DateTimePicker.prototype.setTimeZone.call(this, 0);
};