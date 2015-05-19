function DocumentDataSource(view, metadata) {

    var dataProviderUpload = window.providerRegister.build('UploadDocumentDataSource', metadata);

    var baseDataSource = new BaseDataSource(view, metadata.IdProperty, window.providerRegister.build('DocumentDataSource',metadata));

    baseDataSource.uploadFile = function (fieldName, instanceId, file, resultCallback) {
        dataProviderUpload.uploadFile(fieldName, instanceId, file, resultCallback);
    };

    baseDataSource.getFileUrl = function (fieldName) {
        var selectedItem = baseDataSource.getSelectedItem();
        var instanceId = InfinniUI.ObjectUtils.getPropertyValue(selectedItem, this.getIdProperty());
        return dataProviderUpload.getFileUrl(fieldName, instanceId);
    };


    baseDataSource.getDocumentId = function () {
        return metadata.DocumentId;
    };

    baseDataSource.getConfigId = function () {
        return metadata.ConfigId;
    };

    baseDataSource.getCreateAction = function(){
        return metadata.CreateAction;
    };

    baseDataSource.getGetAction = function(){
        return metadata.GetAction;
    };

    baseDataSource.getUpdateAction = function(){
        return metadata.UpdateAction;
    };

    baseDataSource.getDeleteAction = function(){
       return metadata.DeleteAction;
    };

    return baseDataSource;
}
