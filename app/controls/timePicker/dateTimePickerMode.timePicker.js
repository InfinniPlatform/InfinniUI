console.assert(dateTimePickerModeTime, "dateTimePickerModeTime is undefined");

var dateTimePickerModeTimePicker = _.extend({}, dateTimePickerModeTime, {

    convertValue: function (value) {
        var _value = null;
        if (value && value.constructor === Date) {
            _value = InfinniUI.DateUtils.dateToTimestampTime(value);
        }

        return _value;
    }

});

dateTimePickerStrategy['TimePicker'] = dateTimePickerModeTimePicker;