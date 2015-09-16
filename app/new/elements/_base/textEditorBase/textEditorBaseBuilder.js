/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes editorBaseBuilderMixin
 *
 */
function TextEditorBaseBuilder() {
    _.superClass(TextEditorBaseBuilder, this);
    this.initialize_editorBaseBuilder();
}

_.inherit(TextEditorBaseBuilder, ElementBuilder);

_.extend(TextEditorBaseBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);
        this.applyMetadata_editorBaseBuilder(params);

        var metadata = params.metadata;
        var element = params.element;

        element.setLabelText(metadata.LabelText);
        element.setLabelFloating(metadata.LabelFloating);

        this
            .initDisplayFormat(params)
            .initEditMask(params);
    },

    initDisplayFormat: function (params) {
        var
            metadata = params.metadata,
            builder = params.builder,
            displayFormat;

        if (metadata.DisplayFormat) {
            displayFormat = builder.build(metadata.DisplayFormat, {parentView: params.parentView});
        }
        params.element.setDisplayFormat(displayFormat);
        return this;
    },

    initEditMask: function (params) {
        var
            metadata = params.metadata,
            builder = params.builder,
            editMask;

        if (metadata.EditMask) {
            editMask = builder.build(metadata.EditMask, {parentView: params.parentView});
        }
        params.element.setEditMask(editMask);
        return this;
    }
}, editorBaseBuilderMixin);



