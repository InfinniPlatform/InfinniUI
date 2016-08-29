/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 */
function DateTimePickerBuilder() {
    _.superClass(DateTimePickerBuilder, this);
}

window.InfinniUI.DateTimePickerBuilder = DateTimePickerBuilder;

_.inherit(DateTimePickerBuilder, TextEditorBaseBuilder);

DateTimePickerBuilder.prototype.createElement = function (params) {
    return new DateTimePicker(params.parent);
};

DateTimePickerBuilder.prototype.applyMetadata = function (params) {
    var element = params.element;

    this.applyDefaultMetadata(params);
    var metadata = params.metadata;

    TextEditorBaseBuilder.prototype.applyMetadata.call(this, params);

    element.setTimeZone(metadata.TimeZone);
    element.setMode(metadata.Mode);

    this.applyMinValue(element, metadata.MinValue);
    this.applyMaxValue(element, metadata.MaxValue);

    //var format = params.builder.buildType(params.parent, 'DateFormat', {}, null);
    //element.setDateFormat(format);
};

DateTimePickerBuilder.prototype.applyMinValue = function (element, minValue) {
    element.setMinValue(InfinniUI.DateUtils.parseISO8601toDate(minValue));
};

DateTimePickerBuilder.prototype.applyMaxValue = function (element, maxValue) {
    element.setMaxValue(InfinniUI.DateUtils.parseISO8601toDate(maxValue));
};

DateTimePickerBuilder.prototype.applyDefaultMetadata = function (params) {
    var metadata = params.metadata;
    var defaultFormat = {
            Date: '{:d}',
            DateTime: '{:g}',
            Time: '{:T}'
        },
        defaultEditMask = {
            Date: {DateTimeEditMask: {Mask: 'd'}},
            DateTime: {DateTimeEditMask: {Mask: 'g'}},
            Time: {DateTimeEditMask: {Mask: 'T'}}
        };

    params.metadata = _.extend({}, metadata);

    _.defaults(params.metadata, {Mode: 'Date'});
    _.defaults(params.metadata, {
        DisplayFormat: defaultFormat[params.metadata.Mode],
        EditMask: defaultEditMask[params.metadata.Mode]
    });
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
