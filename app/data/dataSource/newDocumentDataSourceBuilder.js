function DocumentDataSourceBuilder() {
}

_.inherit(DocumentDataSourceBuilder, BaseDataSourceBuilder);

_.extend(DocumentDataSourceBuilder.prototype, {
    applyMetadata: function(builder, parent, metadata, dataSource){
        dataSource.setConfigId(metadata.ConfigId);
        dataSource.setDocumentId(metadata.DocumentId);
        BaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);

        this.initUploader(dataSource);
    },

    createDataSource: function(parent){
        return new DocumentDataSource({
            view: parent
        });
    },

    initUploader: function (metadata) {
        var dataProviderUpload = window.providerRegister.build('DocumentUploadProvider', {
            documentId: metadata.documentId,
            configId: metadata.configId
        });

        this.setUploadDataProvider(dataProviderUpload);
    }
});
