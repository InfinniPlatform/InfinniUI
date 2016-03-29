/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 */
function DateTimePickerBuilder() {
    _.superClass(DateTimePickerBuilder, this);
}

_.inherit(DateTimePickerBuilder, TextEditorBaseBuilder);

DateTimePickerBuilder.prototype.createElement = function (params) {
    return new DateTimePicker(params.parent);
};

DateTimePickerBuilder.prototype.applyMetadata = function (params) {
    var element = params.element;
    var metadata = params.metadata;
    this.applyDefaultMetadata(params);
    TextEditorBaseBuilder.prototype.applyMetadata.call(this, params);

    element.setMinValue(metadata.MinValue);
    element.setMaxValue(metadata.MaxValue);
    element.setMode(metadata.Mode);


    //var format = params.builder.buildType(params.parent, 'DateFormat', {}, null);
    //element.setDateFormat(format);
};

DateTimePickerBuilder.prototype.applyDefaultMetadata = function (params) {
    var metadata = params.metadata;

    var defaultFormat = {
            Date: '{:d}',
            DateTime: '{:g}',
            Time: '{:t}'
        },
        defaultEditMask = {
            Date: {DateTimeEditMask: {Mask: 'd'}},
            DateTime: {DateTimeEditMask: {Mask: 'g'}},
            Time: {DateTimeEditMask: {Mask: 't'}}
        };

    _.defaults(metadata, {Mode: 'Date'});
    _.defaults(metadata, {DisplayFormat: defaultFormat[metadata.Mode], EditMask: defaultEditMask[metadata.Mode]});
};
