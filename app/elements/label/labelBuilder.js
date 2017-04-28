/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes displayFormatBuilderMixin
 * @mixes editorBaseBuilderMixin
 */
function LabelBuilder() {
    _.superClass( TextEditorBaseBuilder, this );
    this.initialize_editorBaseBuilder();
}

InfinniUI.LabelBuilder = LabelBuilder;

_.inherit( LabelBuilder, ElementBuilder );

_.extend( LabelBuilder.prototype, {

    applyMetadata: function( params ) {
        var element = params.element;

        ElementBuilder.prototype.applyMetadata.call( this, params );
        this.applyMetadata_editorBaseBuilder( params );

        element.setTextWrapping( params.metadata.TextWrapping );
        element.setTextTrimming( params.metadata.TextTrimming );
        element.setEscapeHtml( params.metadata.EscapeHtml );

        this.initDisplayFormat( params );
    },

    initDisplayFormat: function( params ) {
        var metadata = params.metadata;
        var format = this.buildDisplayFormat( metadata.DisplayFormat, params );

        params.element.setDisplayFormat( format );
    },

    createElement: function( params ) {
        var label = new Label( params.parent, params.metadata[ 'ViewMode' ] );

        label.getHeight = function() {
            return 34;
        };

        return label;
    }

}, editorBaseBuilderMixin, displayFormatBuilderMixin );
