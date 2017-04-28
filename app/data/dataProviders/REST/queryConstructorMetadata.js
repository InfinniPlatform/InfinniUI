function QueryConstructorMetadata( host, metadata ) {

    this.constructMetadataRequest = function() {
        return {
            'requestUrl': host + '/' + metadata.Path,
            'method': 'GET'
        };
    };

}

InfinniUI.Providers.QueryConstructorMetadata = QueryConstructorMetadata;
