/**
 *
 * @constructor
 */
function DataProviderRegister() {
    var dataProviders = {};

    /**
     *
     * @param metadataType
     * @param dataProviderConstructor
     */
    this.register = function( metadataType, dataProviderConstructor ) {
        dataProviders[ metadataType ] = dataProviderConstructor;
    };

    /**
     *
     * @param metadataType
     * @param props
     * @returns {null}
     */
    this.build = function( metadataType, props ) {
        var dataProvider = dataProviders[ metadataType ];

        if ( typeof dataProvider !== 'undefined' && dataProvider !== null ) {
            return new dataProviders[ metadataType ]( props );
        }
        return null;
    };

}


InfinniUI.providerRegister = new DataProviderRegister();
