function TimePickerBuilder() {
    _.superClass(TimePickerBuilder, this);
}

_.inherit(TimePickerBuilder, DateTimePickerBuilder);

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