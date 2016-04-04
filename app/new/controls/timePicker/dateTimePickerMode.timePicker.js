console.assert(dateTimePickerModeTime, "dateTimePickerModeTime is undefined");

var dateTimePickerModeTimePicker = _.extend({}, dateTimePickerModeTime, {

    onEditorDone: function (value) {
        if(typeof value === 'undefined' || value === null || !value.toString().length) {
            value = null;
        } else {
            //Дата в формате IS) 8601
            value = InfinniUI.DateUtils.dateToTimestampTime(value);
        }

        this.model.set('value', value);
    },

    convertValue: function (value) {
        var _value = null;
        if (value && value.constructor === Date) {
            _value = InfinniUI.DateUtils.dateToTimestampTime(value);
        }

        return _value;
    }
});

dateTimePickerStrategy['TimePicker'] = dateTimePickerModeTimePicker;