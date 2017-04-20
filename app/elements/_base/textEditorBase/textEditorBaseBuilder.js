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

window.InfinniUI.TextEditorBaseBuilder = TextEditorBaseBuilder;

_.inherit( TextEditorBaseBuilder, ElementBuilder );

_.extend( TextEditorBaseBuilder.prototype, {

    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );
        this.applyMetadata_editorBaseBuilder( params );

        var element = params.element;

        this.initBindingToProperty( params, 'LabelText' );
        this.resolveExpressionInText( params, 'LabelText' );

        element.setInputType( this.getCompatibleInputType( params ) );
        this
            .initDisplayFormat( params )
            .initEditMask( params )
            .initEditor( params );
    },

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

    initEditor: function( params ) {
        var element = params.element;
        var editor = new TextEditor();

        editor
            .setDisplayFormat( element.getDisplayFormat() )
            .setEditMask( element.getEditMask() )
            .setValueConverter( function() {
                return element.convertValue.bind( element );
            } )
            .setValidatorValue( element.validateValue.bind( element ) );

        element.setEditor( editor );

        editor.onValueChanged( function( value ) {
            //element.setValue(element.convertValue(value));
            element.setValue( value );
        } );

        element.onValueChanged( function( context, args ) {
            editor.setValue( args.newValue );
        } );

        editor.setValue( element.getValue() );

        return this;
    },

    initDisplayFormat: function( params ) {
        var metadata = params.metadata;
        var format = this.buildDisplayFormat( metadata.DisplayFormat, params );

        params.element.setDisplayFormat( format );

        return this;
    },

    initEditMask: function( params ) {
        var metadata = params.metadata;
        var builder = params.builder;
        var editMask;

        if( metadata.EditMask ) {
            editMask = builder.build( metadata.EditMask, {
                parentView: params.parentView,
                formatOptions: params.formatOptions
            } );
        }
        params.element.setEditMask( editMask );
        return this;
    }

}, editorBaseBuilderMixin, displayFormatBuilderMixin );
