/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 * @mixes displayFormatBuilderMixin
 * @mixes editorBaseBuilderMixin
 */
function FrameBuilder() {
    _.superClass( TextEditorBaseBuilder, this );
    this.initialize_editorBaseBuilder();
}

InfinniUI.FrameBuilder = FrameBuilder;

_.inherit( FrameBuilder, TextEditorBaseBuilder );

_.extend( FrameBuilder.prototype, {

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        var element = params.element;
        ElementBuilder.prototype.applyMetadata.call( this, params );
        this.applyMetadata_editorBaseBuilder( params );
    },

    /**
     *
     * @param params
     * @returns {Frame}
     */
    createElement: function( params ) {
        var element = new Frame( params.parent );

        return element;
    }

}, editorBaseBuilderMixin );
