console.assert(dateTimePickerModeDate, "dateTimePickerModeDate is undefined");

var dateTimePickerModeDatePicker = _.extend({}, dateTimePickerModeDate, {

    onEditorDone: function (value) {
        if(typeof value === 'undefined' || value === null || !value.toString().length) {
            value = null;
        } else {
            //Дата в формате ISO 8601
            value = InfinniUI.DateUtils.dateToTimestamp(value);
        }

        this.model.set('value', value);
    },

    convertValue: function (value) {
        var _value;
        if (value && value.constructor === Date) {
            _value = InfinniUI.DateUtils.dateToTimestamp(value);
        }

        return _value;
    }
});

dateTimePickerStrategy['DatePicker'] = dateTimePickerModeDatePicker;
