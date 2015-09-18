/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 */
function DatePickerBuilder() {
    _.superClass(DatePickerBuilder, this);
}

_.inherit(DatePickerBuilder, TextEditorBaseBuilder);

DatePickerBuilder.prototype.createElement = function (params) {
    return new DatePicker(params.parent);
};

DatePickerBuilder.prototype.applyMetadata = function (params) {
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

DatePickerBuilder.prototype.applyDefaultMetadata = function (params) {
    var metadata = params.metadata;

    var defaultFormat = {
            Date: {DateTimeFormat: {Format: 'd'}},
            DateTime: {DateTimeFormat: {Format: 'g'}},
            Time: {DateTimeFormat: {Format: 't'}}
        },
        defaultEditMask = {
            Date: {DateTimeEditMask: {Mask: 'd'}},
            DateTime: {DateTimeEditMask: {Format: 'g'}},
            Time: {DateTimeEditMask: {Format: 't'}}
        };

    _.defaults(metadata, {Mode: 'Date'});
    _.defaults(metadata, {DisplayFormat: defaultFormat[metadata.Mode], EditMask: defaultEditMask[metadata.Mode]});
};
