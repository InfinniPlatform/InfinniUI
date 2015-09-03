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
    return new DatePickerBuilder(params.parent);
};

DatePickerBuilder.prototype.applyMetadata = function (params) {
    TextEditorBaseBuilder.prototype.applyMetadata.call(this, params);

    var element = params.element;
    var metadata = params.metadata;

    element.setMinValue(metadata.MinValue);
    element.setMaxValue(metadata.MaxValue);
    element.setMode(metadata.Mode);
};

