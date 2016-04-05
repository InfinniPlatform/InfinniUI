function TimePickerBuilder() {
    _.superClass(TimePickerBuilder, this);
}

_.inherit(TimePickerBuilder, DateTimePickerBuilder);

TimePickerBuilder.prototype.createElement = function (params) {
    return new TimePicker(params.parent);
};

TimePickerBuilder.prototype.applyDefaultMetadata = function (params) {

    DateTimePickerBuilder.call(this, params);

    var metadata = params.metadata;
    metadata.Mode = 'TimePicker';
    metadata.TimeZone = 0;

    _.defaults(metadata, {
        DisplayFormat: '{:T}',
        EditMask: {DateTimeEditMask: {Mask: 'T'}}
    });

};

TimePickerBuilder.prototype.applyMinValue = function (element, minValue) {
    var date = InfinniUI.DateUtils.parseTimeISO8601toDate(minValue);

    if (typeof date !== 'undefined') {
        element.setMinValue(date);
    }
};

TimePickerBuilder.prototype.applyMaxValue = function (element, maxValue) {
    var date = InfinniUI.DateUtils.parseTimeISO8601toDate(maxValue);

    if (typeof date !== 'undefined') {
        element.setMaxValue(date);
    }
};