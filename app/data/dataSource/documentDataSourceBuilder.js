var DocumentDataSourceBuilder = function() {
    _.superClass(DocumentDataSourceBuilder, this);
}

_.inherit(DocumentDataSourceBuilder, newBaseDataSourceBuilder);

_.extend(DocumentDataSourceBuilder.prototype, {
    applyMetadata: function(builder, parent, metadata, dataSource){
        newBaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);

        dataSource.setDocumentId(metadata['DocumentId']);

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
