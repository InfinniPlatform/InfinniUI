function MetadataProviderREST( metadataUrlConstructor, successCallback, failCallback ) {
    this.getMetadata = function( resultCallback ) {
        var data = metadataUrlConstructor.constructMetadataRequest();
        new RequestExecutor( resultCallback, successCallback, failCallback, this.cache ).makeRequest( data );
    };
}

window.InfinniUI.Providers.MetadataProviderREST = MetadataProviderREST;
