/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 */
function TextBoxBuilder() {
    _.superClass(TextBoxBuilder, this);
}

_.inherit(TextBoxBuilder, TextEditorBaseBuilder);

TextBoxBuilder.prototype.createElement = function (params) {
    return new TextBox(params.parent);
};

TextBoxBuilder.prototype.applyMetadata = function (params) {
    TextEditorBaseBuilder.prototype.applyMetadata.call(this, params);

    var element = params.element;
    var metadata = params.metadata;

    element.setMultiline(metadata.Multiline);
    element.setLineCount(metadata.LineCount);
};

