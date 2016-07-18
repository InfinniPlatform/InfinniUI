function QueryConstructorMetadata(host, metadata) {

    this.constructMetadataRequest = function () {
        return {
            "requestUrl": host + '/' + metadata.Path,
            "method": "GET"
        };
    };
}

window.InfinniUI.Providers.QueryConstructorMetadata = QueryConstructorMetadata;