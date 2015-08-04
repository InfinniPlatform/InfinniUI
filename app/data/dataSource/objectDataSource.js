function oldObjectDataSource(view, metadata) {
    var dataProviderUpload = window.providerRegister.build('UploadDocumentDataSource', metadata);

    var baseDataSource = new BaseDataSource(view, metadata.IdProperty, window.providerRegister.build('ObjectDataSource',metadata));

    baseDataSource.uploadFile = function (fieldName, instanceId, file, resultCallback) {
        dataProviderUpload.uploadFile(fieldName.replace(/^\$\./, ''), instanceId, file, resultCallback);
    };

    baseDataSource.getFileUrl = function (propertyName) {

        var selectedItem = baseDataSource.getSelectedItem();
        var instanceId;
        var idProperty = this.getIdProperty();
        var fieldName;

        if (propertyName) {

            if (/^\d+\..*$/g.test(propertyName)) {
                var matches = propertyName.match(/^(\d+)(.*)$/);
                if (matches && matches.length === 3) {
                    if (matches[2].substr(0,1) === '.') {
                        instanceId = InfinniUI.ObjectUtils.getPropertyValue(this.getDataItems(), matches[1] + '.' + idProperty);
                        fieldName = matches[2].substr(1);
                    }
                }
            } else if (/^\$\..+$/.test(propertyName)) {
                instanceId = InfinniUI.ObjectUtils.getPropertyValue(selectedItem, idProperty);
                fieldName = propertyName.substr(2);
            } else {
                instanceId = InfinniUI.ObjectUtils.getPropertyValue(selectedItem, idProperty);
                fieldName = propertyName;
            }
        }
        return fieldName ? dataProviderUpload.getFileUrl(fieldName, instanceId) : null;

        //
        //var selectedItem = baseDataSource.getSelectedItem();
        //var instanceId = InfinniUI.ObjectUtils.getPropertyValue(selectedItem, this.getIdProperty());
        //return dataProviderUpload.getFileUrl(fieldName, instanceId);
    };

    // timeout нужен для работающего биндинга к objectdatasource, объявленного в разделе datasources. Причина не до конца ясна.
    //setTimeout(function(){
        //baseDataSource.eventStore.executeEvent('onItemsUpdated', {}, {value: metadata.Items});
        //baseDataSource.loadingProcessDone();
    //}, 30);

    return baseDataSource;

}