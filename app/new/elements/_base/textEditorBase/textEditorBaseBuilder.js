/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes editorBaseBuilderMixin
 * @mixes displayFormatBuilderMixin
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

        this.initBindingToProperty(params, 'LabelText');

        this
            .initDisplayFormat(params)
            .initEditMask(params)
            .initEditor(params);
    },

    initEditor: function (params) {
        var element = params.element;
        var editor = new TextEditor2(element);
        element.setEditor(editor);
        editor.onChangeValue(function (value) {
            element.setValue(value);
        });

        return this;
    },

    initDisplayFormat: function (params) {

        var
            metadata = params.metadata,
            format = this.buildDisplayFormat(metadata.DisplayFormat, params);

        params.element.setDisplayFormat(format);
        return this;
    },

    initEditMask: function (params) {
        var
            metadata = params.metadata,
            builder = params.builder,
            editMask;

        if (metadata.EditMask) {
            editMask = builder.build(metadata.EditMask, {
                parentView: params.parentView,
                formatOptions: params.formatOptions
            });
        }
        params.element.setEditMask(editMask);
        return this;
    }
}, editorBaseBuilderMixin, displayFormatBuilderMixin);



