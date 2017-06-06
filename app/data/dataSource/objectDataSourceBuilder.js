/**
 * @augments BaseDataSourceBuilder
 * @constructor
 */
function ObjectDataSourceBuilder() {
}

_.inherit( ObjectDataSourceBuilder, BaseDataSourceBuilder );

_.extend( ObjectDataSourceBuilder.prototype, {

    /**
     * @returns {ObjectDataSource}
     * @param parent
     */
    createDataSource: function( parent ) {
        return new ObjectDataSource( {
            view: parent
        } );
    },

    /**
     *
     * @param builder
     * @param parent
     * @param metadata
     * @param dataSource
     */
    applyMetadata: function( builder, parent, metadata, dataSource ) {
        BaseDataSourceBuilder.prototype.applyMetadata.call( this, builder, parent, metadata, dataSource );

        if( !'IsLazy' in metadata ) {
            dataSource.setIsLazy( false );
        }

        if( metadata.Items ) {
            if( Array.isArray( metadata.Items ) ) {
                dataSource.setItems( metadata.Items );
            }

            if( $.isPlainObject( metadata.Items ) ) {
                var binding = builder.buildBinding( metadata.Items, {
                    parentView: parent
                } );

                binding.setMode( InfinniUI.BindingModes.toElement );
                binding.bindElement( dataSource, '' );
            }
        }
    }

} );

InfinniUI.ObjectDataSourceBuilder = ObjectDataSourceBuilder;
