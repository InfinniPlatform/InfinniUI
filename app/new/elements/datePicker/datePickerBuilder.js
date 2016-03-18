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

    element.setTimeZone(metadata.TimeZone);
    element.setMinValue(metadata.MinValue);
    element.setMaxValue(metadata.MaxValue);
    element.setMode(metadata.Mode);

    //var format = params.builder.buildType(params.parent, 'DateFormat', {}, null);
    //element.setDateFormat(format);
};

DatePickerBuilder.prototype.applyDefaultMetadata = function (params) {
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

DatePickerBuilder.prototype.initDisplayFormat = function (params) {
    return TextEditorBaseBuilder.prototype.initDisplayFormat.call(this, this.applyTimeZone(params));
};

DatePickerBuilder.prototype.initEditMask = function (params) {
    return TextEditorBaseBuilder.prototype.initEditMask.call(this, this.applyTimeZone(params));
};

DatePickerBuilder.prototype.applyTimeZone = function (params) {
    var metadata = params.metadata;
    var _params = {};
    var formatOptions = {};

    if (typeof metadata.TimeZone !== 'undefined' && metadata.TimeZone !== null ) {
        formatOptions.TimeZone = metadata.TimeZone;
    }

    _.defaults(_params, params, {formatOptions: formatOptions});
    return _params;
};
