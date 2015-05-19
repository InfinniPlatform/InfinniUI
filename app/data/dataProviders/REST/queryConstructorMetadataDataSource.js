function QueryConstructorMetadataDataSource(host, metadata) {

    metadata = metadata || {};

    var urlTemplate = '{0}/SystemConfig/StandardApi/metadata/{1}';
    var configId = metadata.ConfigId;
    var documentId = metadata.DocumentId;
    var metadataType = metadata.MetadataType;
    var metadataName = metadata.MetadataName;



    var getRegisteredConfigListAction = 'getregisteredconfiglist';
    var getConfigurationMetadataAction = 'getconfigurationmetadata';
    var getDocumentListMetadataAction = 'getdocumentlistmetadata';
    var getDocumentMetadataAction = 'getdocumentmetadata';
    var getDocumentElementListMetadataAction = 'getdocumentelementlistmetadata';
    var getMenuListMetadataAction = 'getmenulistmetadata';
    var getMenuMetadataAction = 'getmenumetadata';
    var getValidationWarningMetadataAction = 'getvalidationwarningmetadata';
    var getValidationErrorMetadataAction = 'getvalidationerrormetadata';


    var getRegisteredConfigListRequestParams = function() {
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


    this.constructGetRegisteredConfigListRequest = function(){
         return {
             "requestUrl" : stringUtils.format(urlTemplate,[host, getRegisteredConfigListAction]),
             "args" : getRegisteredConfigListRequestParams()
         };
    };

    this.constructGetConfigurationMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(urlTemplate,[host, getConfigurationMetadataAction]),
            "args" : getRegisteredConfigListRequestParams()
        };
    };

    this.constructGetDocumentListMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(urlTemplate,[host, getDocumentListMetadataAction]),
            "args" : getRegisteredConfigListRequestParams()
        };
    };

    this.constructGetDocumentMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(urlTemplate,[host, getDocumentMetadataAction]),
            "args" : getRegisteredConfigListRequestParams()
        };
    };

    this.constructGetDocumentElementListMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(urlTemplate,[host, getDocumentElementListMetadataAction]),
            "args" : getRegisteredConfigListRequestParams()
        };
    };

    this.constructGetMenuListMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(urlTemplate,[host, getMenuListMetadataAction]),
            "args" : getRegisteredConfigListRequestParams()
        };
    };

    this.constructGetMenuMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(urlTemplate,[host, getMenuMetadataAction]),
            "args" : getRegisteredConfigListRequestParams()
        };
    };

    this.constructGetValidationWarningMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(urlTemplate,[host, getValidationWarningMetadataAction]),
            "args" : getRegisteredConfigListRequestParams()
        };
    };

    this.constructGetValidationErrorMetadataActionRequest = function(){
        return {
            "requestUrl" : stringUtils.format(urlTemplate,[host, getValidationErrorMetadataAction]),
            "args" : getRegisteredConfigListRequestParams()
        };
    };
}