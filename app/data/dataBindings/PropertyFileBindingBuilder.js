var FileBindingBuilder = function () {

};

FileBindingBuilder.prototype.build = function (builder, parent, metadata, collectionProperty) {

    var metadataProperty = metadata.Property;

    if(collectionProperty){
        metadataProperty = collectionProperty.resolve(metadata.Property);
    }

    var fileBinding = new FileBinding(parent, metadata.DataSource, metadataProperty);

    var dataSource = parent.getDataSource(metadata.DataSource);

    var uploadFile = function (instanceId) {
        var defer = $.Deferred();
        var file = fileBinding.getFile();
        if (typeof file === 'undefined' || file === null) {
            return;
        }

        dataSource.uploadFile(metadataProperty, instanceId, fileBinding.getFile(), function (response) {
            defer.resolve(response);
        });
        return defer.promise();
    };

    if(dataSource !== null){

        //При изменении значения в источнике данных - получаем URL загруженного файла из источника
        fileBinding.onPropertyValueChanged(function (context, args) {
            fileUrl = fileBinding.getFileUrl();

            var value = args.value;

            if (value.Info.ContentId) {
                var fileUrl = dataSource.getFileUrl(metadataProperty);
                fileBinding.setFileUrl(fileUrl);
            }
            //if (typeof fileUrl === 'undefined' || fileUrl === null) {
            //}
        });

        dataSource.addDataBinding(fileBinding);

        //При сохранении существующего документа - загрузить файл
        dataSource.onBeforeItemSaved(function (context, message) {
            var item = message.value;
            var instanceId = InfinniUI.ObjectUtils.getPropertyValue(item, dataSource.getIdProperty());
            return uploadFile(instanceId);
        });

        //При сохранении нового документа - сохранить файл
        dataSource.onBeforeItemCreated(function (instanceId) {
            return uploadFile(instanceId);
        });

    }

    return fileBinding;
};