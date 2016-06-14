function QueryConstructorMetadataDataSource(host, metadata) {

    metadata = metadata || {};

    var urlTemplate = '{0}/RestfulApi/StandardApi/configuration/getConfigMetadata';
    var configId = metadata.ConfigId;
    var documentId = metadata.DocumentId;
    var metadataType = metadata.MetadataType;
    var metadataName = metadata.MetadataName;

    var getRequestParams = function() {
        var changesObject = 'null';

        if(configId || documentId|| metadataType || metadataName){
            changesObject = {};

            if(configId){
                changesObject.ConfigId = configId;
            }
            if(documentId){
                changesObject.DocumentId = documentId;
            }
            if(metadataType){
                changesObject.MetadataType = metadataType;
            }
            if(metadataName){
                changesObject.MetadataName = metadataName;
            }
        }

        return {
            "id": null,
            "changesObject": changesObject,
            "replace": false
        };
    };


    this.constructMetadataRequest = function(){
         return {
             "requestUrl" : stringUtils.format(urlTemplate,[host]),
             "args" : getRequestParams()
         };
    };


}

window.InfinniUI.Providers.QueryConstructorMetadataDataSource = QueryConstructorMetadataDataSource;