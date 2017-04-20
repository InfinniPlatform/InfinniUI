function DataProviderRegister() {
    var dataProviders = {};

    this.register = function( metadataType, dataProviderConstructor ) {
        dataProviders[ metadataType ] = dataProviderConstructor;
    };

    this.build = function( metadataType, props ) {
        var dataProvider = dataProviders[ metadataType ];
        if ( dataProvider !== undefined && dataProvider !== null ) {
            return new dataProviders[ metadataType ]( props );
        }
        return null;
    };
}


window.InfinniUI.providerRegister = new DataProviderRegister();
