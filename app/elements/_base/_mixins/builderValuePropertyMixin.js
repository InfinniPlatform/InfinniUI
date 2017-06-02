/**
 *
 * @mixin
 */
var builderValuePropertyMixin = {

    /**
     * @param {Object} params
     * @param {Boolean|false} useValidation Использовать валидацию
     * @returns {*}
     */
    initValueProperty: function( params, useValidation ) {
        var metadata = params.metadata;

        if( typeof useValidation === 'undefined' ) {
            useValidation = false;
        }

        if( metadata.Value !== undefined ) {
            var dataBinding = params.builder.build( params.view, metadata.Value, params.collectionProperty );

            dataBinding.setElement( params.element );

            if( dataBinding !== null ) {
                dataBinding.onPropertyValueChanged( function( dataSourceName, value ) {
                    params.element.setValue( dataBinding.getPropertyValue() );
                } );

                var data = dataBinding.getPropertyValue();
                if( data !== null && typeof data !== 'undefined' ) {
                    params.element.setValue( data );
                }

                params.element.onValueChanged( function( dataSourceName, value ) {
                    dataBinding.setPropertyValue( value );
                } );
            }


            if( useValidation && dataBinding ) {
                params.element.onLostFocus( function() {
                    dataBinding.validate();
                } );
            }

            return dataBinding;
        }
    }

};

InfinniUI.builderValuePropertyMixin = builderValuePropertyMixin;
