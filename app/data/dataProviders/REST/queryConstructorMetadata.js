function QueryConstructorMetadata(host,metadata){

    var viewMetadataUrlTemplate = '{0}/systemconfig/StandardApi/metadata/getmanagedmetadata';

    var metadataUrlTemplate = '{0}/SystemConfig/StandardApi/configuration/getconfigmetadata';

    var metadataConfigListUrlTemplate = '{0}/SystemConfig/StandardApi/configuration/getconfigmetadatalist';

    var makeGetViewMetadataRequestParams = function() {
        return {
            "id": null,
            "changesObject": {
                "Configuration": metadata.ConfigId,
                "MetadataObject": metadata.DocumentId,
                "MetadataType": metadata.ViewType,
                "MetadataName": metadata.MetadataName,
                "Parameters": metadata.Parameters
            },
            "replace": false
        }
    };

    var makeGetConfigMetadataRequestParams = function() {
        return {
            "id": null,
            "changesObject":null,
            "replace":false
        }
    };

    var makeGetMenuMetadataRequestParams = function() {
        return {
            "id": null,
            "changesObject":{
                "Configuration":metadata.ConfigId,
                "MetadataType":'Menu'
             },
            "replace":false
        }
    };

    this.constructConfigMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(metadataConfigListUrlTemplate,[host]),
            "args" : makeGetConfigMetadataRequestParams()
        };
    };

    this.constructViewMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(viewMetadataUrlTemplate,[host]),
            "args" : makeGetViewMetadataRequestParams()
        };
    };

    this.constructMenuMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(metadataConfigListUrlTemplate,[host]),
            "args" : makeGetMenuMetadataRequestParams()
        };
    };

}