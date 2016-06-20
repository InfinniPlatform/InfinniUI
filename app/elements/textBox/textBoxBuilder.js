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
    var lineCount = metadata.LineCount;
    var type = metadata.Type;
    element.setMultiline(metadata.Multiline);
    if (metadata.Multiline && lineCount === null || typeof lineCount === 'undefined') {
        lineCount = 2;
    }
    element.setLineCount(lineCount);

    if (type) {
        element.setType(type);
    }
};

