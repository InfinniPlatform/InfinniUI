console.assert(dateTimePickerModeTime, "dateTimePickerModeTime is undefined");

var dateTimePickerModeTimePicker = _.extend({}, dateTimePickerModeTime, {

    onEditorDone: function (value) {
        if(typeof value === 'undefined' || value === null || !value.toString().length) {
            value = null;
        } else {
            //Дата в формате ISO 8601
            value = InfinniUI.DateUtils.dateToTimestampTime(value);
        }

        this.model.set('value', value);
    },

    onEditorValidate: function (value) {
        var model = this.model;

        var minValue = InfinniUI.DateUtils.restoreTimezoneOffset(model.get('minValue'), model.get('timeZone'));
        var maxValue = InfinniUI.DateUtils.restoreTimezoneOffset(model.get('maxValue'), model.get('timeZone'));

        console.info(value, minValue, maxValue);
        return InfinniUI.DateUtils.checkRangeDate(value, minValue, maxValue);
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