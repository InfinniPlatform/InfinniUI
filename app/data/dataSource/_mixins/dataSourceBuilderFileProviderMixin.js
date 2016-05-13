var DataSourceBuilderFileProviderMixin = {

    initFileProvider: function (metadata, dataSource) {

        var host = InfinniUI.config.serverUrl,
            configId = metadata.ConfigId,
            documentId = metadata.DocumentId;

        var fileUrlConstructor = new DocumentUploadQueryConstructor(host, {
            configId: configId,
            documentId: documentId
        });

        var fileProvider = new DocumentFileProvider(fileUrlConstructor);

        dataSource.setFileProvider(fileProvider);
    }

};
