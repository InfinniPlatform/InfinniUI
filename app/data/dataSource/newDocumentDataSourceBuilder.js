function DocumentDataSourceBuilder() {
}

_.inherit(DocumentDataSourceBuilder, BaseDataSourceBuilder);

_.extend(DocumentDataSourceBuilder.prototype, {
    applyMetadata: function(builder, parent, metadata, dataSource){
        BaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);
        dataSource.setConfigId(metadata.ConfigId);
        dataSource.setDocumentId(metadata.DocumentId);
    },

    createDataSource: function(parent){
        return new DocumentDataSource({
            view: parent
        });
    },

    initFileProvider: function (dataSource) {
        var fileProvider = window.providerRegister.build('DocumentFileProvider', {
            documentId: dataSource.getDocumentId(),
            configId: dataSource.getConfigId()
        });

        dataSource.setFileProvider(fileProvider);
    }
});
