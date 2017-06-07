/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes editorBaseBuilderMixin
 * @mixes displayFormatBuilderMixin
 *
 */
function TextEditorBaseBuilder() {
    _.superClass( TextEditorBaseBuilder, this );
    this.initialize_editorBaseBuilder();
}

InfinniUI.TextEditorBaseBuilder = TextEditorBaseBuilder;

_.inherit( TextEditorBaseBuilder, ElementBuilder );

_.extend( TextEditorBaseBuilder.prototype, {

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );
        this.applyMetadata_editorBaseBuilder( params );

        var element = params.element;

        this.initBindingToProperty( params, 'LabelText' );
        this.resolveExpressionInText( params, 'LabelText' );

        element.setInputType( this.getCompatibleInputType( params ) );
        this
            .initDisplayFormat( params )
            .initEditMask( params );
    },

    /**
     *
     * @param params
     * @returns {number|string}
     */
    getCompatibleInputType: function( params ) {
        var inputType = params.metadata.Type;
        var editMask = params.metadata.EditMask;

        if( typeof inputType === 'undefined' ) {
            inputType = params.element.getInputType();
        }

        if( editMask ) {
            //Маска редактирования задается только для input[type=text]
            inputType = 'text';
        }

        return inputType;
    },


    /**
     *
     * @param params
     * @returns {TextEditorBaseBuilder}
     */
    initDisplayFormat: function( params ) {
        var metadata = params.metadata;
        var format = this.buildDisplayFormat( metadata.DisplayFormat, params );

        params.element.setDisplayFormat( format );

        return this;
    },

    /**
     *
     * @param params
     * @returns {TextEditorBaseBuilder}
     */
    initEditMask: function( params ) {
        var metadata = params.metadata;

        params.element.setEditMask( metadata.EditMask );
        return this;
    }

}, editorBaseBuilderMixin, displayFormatBuilderMixin );
