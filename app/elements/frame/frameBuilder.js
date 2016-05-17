/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 * @mixes displayFormatBuilderMixin
 * @mixes editorBaseBuilderMixin
 */
function FrameBuilder() {
    _.superClass(TextEditorBaseBuilder, this);
    this.initialize_editorBaseBuilder();
}

_.inherit(FrameBuilder, TextEditorBaseBuilder);

_.extend(FrameBuilder.prototype, {
        applyMetadata: function(params){
            var element = params.element;
            ElementBuilder.prototype.applyMetadata.call(this, params);
            this.applyMetadata_editorBaseBuilder(params);
        },

        createElement: function(params){
            var element = new Frame(params.parent);
            return element;
        }

    },
    editorBaseBuilderMixin
);