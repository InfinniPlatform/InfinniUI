var DatePickerModel = ControlModel.extend({
    defaults: _.defaults({
        mode: 'Date',
        minDate: null,
        maxDate: null,
        format: null,
        readonly: false,
        value: null
    }, ControlModel.prototype.defaults)
});
