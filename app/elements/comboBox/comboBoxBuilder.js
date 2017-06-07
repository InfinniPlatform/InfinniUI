/**
 * @augments ListEditorBaseBuilder
 * @constructor
 */
function ComboBoxBuilder() {
    _.superClass( ComboBoxBuilder, this );
}

InfinniUI.ComboBoxBuilder = ComboBoxBuilder;

_.inherit( ComboBoxBuilder, ListEditorBaseBuilder );

_.extend( ComboBoxBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {ComboBox}
     */
    createElement: function( params ) {
        return new ComboBox( params.parent );
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        var element = params.element;
        var that = this;
        var data = ListEditorBaseBuilder.prototype.applyMetadata.call( this, params );

        this.initValueTemplate( data.valueBinding, params );
        this.initBindingToProperty( params, 'LabelText' );
        this.resolveExpressionInText( params, 'LabelText' );
        element.setAutocomplete( params.metadata.Autocomplete );
        element.setShowClear( params.metadata.ShowClear );

        if( params.metadata.Autocomplete ) {
            var name = element.getName();

            if( !name ) {
                name = that.generateName();
                element.setName( name );
            }
        }
    },

    /**
     *
     * @param binding
     * @param params
     */
    initValueTemplate: function( binding, params ) {
        var metadata = params.metadata;
        var element = params.element;
        var valueTemplate;

        if( 'ValueTemplate' in metadata ) {
            valueTemplate = this.buildValueTemplate( metadata.ValueTemplate, params );
        } else if( 'ValueFormat' in metadata ) {
            valueTemplate = this.buildValueTemplateByFormat( binding, metadata.ValueFormat, params );
        } else {
            valueTemplate = this.buildValueTemplateByDefault( binding, params );
        }

        element.setValueTemplate( valueTemplate );
    },

    /**
     *
     * @param templateMetadata
     * @param params
     * @returns {Function}
     */
    buildValueTemplate: function( templateMetadata, params ) {
        var builder = params.builder;
        var basePathOfProperty = params.basePathOfProperty || new BasePathOfProperty( '' );

        return function( context, args ) {
            var index = args.index;
            var bindingIndex;
            var argumentForBuilder = {
                parent: params.element,
                parentView: params.parentView
            };

            if( typeof index !== 'undefined' && index !== null ) {
                //bindingIndex = that.bindingIndexByItemsIndex(index, params);
                bindingIndex = index;

                if( typeof bindingIndex !== 'undefined' && bindingIndex !== null ) {
                    argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild( '', bindingIndex );
                } else {
                    argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild( '', index );
                }
            }

            return builder.build( templateMetadata, argumentForBuilder );
        };
    },

    /**
     *
     * @param binding
     * @param valueFormatMetadata
     * @param params
     * @returns {Function}
     */
    buildValueTemplateByFormat: function( binding, valueFormatMetadata, params ) {
        var format = this.buildDisplayFormat( valueFormatMetadata, params );

        return function( context, args ) {
            var value = args.value;
            var label = new Label( this );

            label.setHorizontalAlignment( 'Left' );
            label.setDisplayFormat( format );
            label.setValue( value );

            return label;
        };
    },

    /**
     *
     * @param binding
     * @param params
     * @returns {Function}
     */
    buildValueTemplateByDefault: function( binding, params ) {
        return function( context, args ) {
            var value = args.value;
            var label = new Label( this );

            label.setHorizontalAlignment( 'Left' );
            label.setValue( value );

            return label;
        };
    },

    /**
     *
     * @returns {string}
     */
    generateName: function() {
        return 'combobox-' + guid();
    }

} );
