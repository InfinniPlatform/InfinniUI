function DataProviderRegister() {
    var dataProviders = [];

    this.register = function (metadataType, dataProviderConstructor) {
        dataProviders[metadataType] = dataProviderConstructor;
    };

    this.build = function (metadataType, metadataValue) {
        var dataProvider = dataProviders[metadataType];
        if (dataProvider !== undefined && dataProvider !== null) {
            return new dataProviders[metadataType](metadataValue);
        }
        return null;
    };
}


window.providerRegister = new DataProviderRegister();
