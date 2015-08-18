/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes editorBaseBuilderMixin
 *
 */
function TextEditorBaseBuilder() {
    _.superClass(TextEditorBaseBuilder, this);
    editorBaseBuilderMixin.call(this);
}

_.inherit(TextEditorBaseBuilder, ElementBuilder);

TextEditorBaseBuilder.prototype.applyMetadata = function (params) {
    ElementBuilder.prototype.applyMetadata.call(this, params);
    editorBaseBuilderMixin.applyMetadata.call(this, params);

    var metadata = params.metadata;
    var element = params.element;

    element.setLabelText(metadata.LabelText);
    element.setLabelFloating(metadata.LabelFloating);

    this.initDisplayFormat(params);
    this.initEditMask(params);
};

TextEditorBaseBuilder.prototype.initDisplayFormat = function (params) {
    var metadata = params.metadata;
    var displayFormat;

    if (metadata.DisplayFormat) {
        displayFormat = params.build(params.parent, metadata.DisplayFormat);
    }
    params.element.setDisplayFormat(displayFormat);
};

TextEditorBaseBuilder.prototype.initEditMask = function (params) {
    var editMask;
    //TODO BuildEditMask from metadata.EditMask
    params.element.setEditMask(editMask);
};



