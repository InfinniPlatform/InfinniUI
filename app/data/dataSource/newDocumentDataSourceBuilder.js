function DocumentDataSourceBuilder() {
}

_.inherit(DocumentDataSourceBuilder, BaseDataSourceBuilder);

_.extend(DocumentDataSourceBuilder.prototype, {
    applyMetadata: function(builder, parent, metadata, dataSource){
        dataSource.setConfigId(metadata.ConfigId);
        dataSource.setDocumentId(metadata.DocumentId);

        BaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);
    },

    createDataSource: function(parent){
        return new DocumentDataSource({
            view: parent
        });
    }
});
