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

    element.setTimeZone(metadata.TimeZone);
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

DateTimePickerBuilder.prototype.initDisplayFormat = function (params) {
    return TextEditorBaseBuilder.prototype.initDisplayFormat.call(this, this.applyTimeZone(params));
};

DateTimePickerBuilder.prototype.initEditMask = function (params) {
    return TextEditorBaseBuilder.prototype.initEditMask.call(this, this.applyTimeZone(params));
};

DateTimePickerBuilder.prototype.applyTimeZone = function (params) {
    var metadata = params.metadata;
    var _params = {};
    var formatOptions = {};

    if (typeof metadata.TimeZone !== 'undefined' && metadata.TimeZone !== null ) {
        formatOptions.TimeZone = metadata.TimeZone;
    }

    _.defaults(_params, params, {formatOptions: formatOptions});
    return _params;
};