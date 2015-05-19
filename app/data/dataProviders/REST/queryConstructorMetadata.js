function QueryConstructorMetadata(host,metadata){

    var viewMetadataUrlTemplate = '{0}/systemconfig/StandardApi/metadata/getmanagedmetadata';

    var menuMetadataUrlTemplate = '{0}/systemconfig/StandardApi/metadata/getmenumetadata';

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

    var makeGetMenuMetadataRequestParams = function() {
        return {
            "id": null,
            "changesObject":{
                "ConfigId":metadata.ConfigId,
                "MetadataType":"Menu",
                "MetadataName":metadata.MetadataName
             },
            "replace":false
        }
    };

    this.constructViewMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(viewMetadataUrlTemplate,[host]),
            "args" : makeGetViewMetadataRequestParams()
        };
    };

    this.constructMenuMetadataRequest = function(){
        return {
            "requestUrl" : stringUtils.format(menuMetadataUrlTemplate,[host]),
            "args" : makeGetMenuMetadataRequestParams()
        };
    };

}