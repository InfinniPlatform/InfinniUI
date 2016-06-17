function QueryConstructorMetadata(host,metadata){

    var viewMetadataUrlTemplate = '{0}/content/metadata/Views/{1}/{2}.json';

    this.constructViewMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(viewMetadataUrlTemplate,[host],[metadata.DocumentId],[metadata.MetadataName]),
            "method": "GET"
        };
    };
}

window.InfinniUI.Providers.QueryConstructorMetadata = QueryConstructorMetadata;