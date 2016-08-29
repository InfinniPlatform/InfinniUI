function DatePickerBuilder() {
    _.superClass(DatePickerBuilder, this);
}

window.InfinniUI.DatePickerBuilder = DatePickerBuilder;

_.inherit(DatePickerBuilder, DateTimePickerBuilder);

DatePickerBuilder.prototype.createElement = function (params) {
    return new DatePicker(params.parent);
};


DatePickerBuilder.prototype.applyDefaultMetadata = function (params) {

    params.metadata = _.extend({}, params.metadata, {
        Mode: 'DatePicker',
        TimeZone: 0
    });

    _.defaults(params.metadata, {
        DisplayFormat: '{:d}',
        EditMask: {DateTimeEditMask: {Mask: 'd'}}
    });
};
