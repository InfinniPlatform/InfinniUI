var DatePickerModel = ControlModel.extend({
    defaults: _.defaults({
        mode: 'Date',
        minDate: null,
        maxDate: null,
        format: null,
        readonly: false,
        value: null,
        foreground: 'Black',
        background: 'Transparent',
        textStyle: 'Body1'
    }, ControlModel.prototype.defaults)
});
