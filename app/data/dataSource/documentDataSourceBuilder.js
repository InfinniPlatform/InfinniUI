function DocumentDataSourceBuilder() {
}

_.inherit(DocumentDataSourceBuilder, newBaseDataSourceBuilder);

_.extend(DocumentDataSourceBuilder.prototype, {
    applyMetadata: function(builder, parent, metadata, dataSource){
        BaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);

        dataSource.setConfigId(metadata['ConfigId']);
        dataSource.setDocumentId(metadata['DocumentId']);

        if('CreateAction' in metadata){
            dataSource.setCreateAction(metadata['CreateAction']);
        }
        if('ReadAction' in metadata){
            dataSource.setReadAction(metadata['ReadAction']);
        }
        if('UpdateAction' in metadata){
            dataSource.setUpdateAction(metadata['UpdateAction']);
        }
        if('DeleteAction' in metadata){
            dataSource.setDeleteAction(metadata['DeleteAction']);
        }

    },

    createDataSource: function(parent){
        return new DocumentDataSource({
            view: parent
        });
    }

    //initFileProvider: function (dataSource) {
    //    var fileProvider = window.providerRegister.build('DocumentFileProvider', {
    //        documentId: dataSource.getDocumentId(),
    //        configId: dataSource.getConfigId()
    //    });
    //
    //    dataSource.setFileProvider(fileProvider);
    //}
});
