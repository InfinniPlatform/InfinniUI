function ObjectDataSourceBuilder() {
}

_.inherit(ObjectDataSourceBuilder, BaseDataSourceBuilder);

_.extend(ObjectDataSourceBuilder.prototype, {
    createDataSource: function(parent){
        return new ObjectDataSource({
            view: parent
        });
    },

    applyMetadata: function(builder, parent, metadata, dataSource){
        BaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);
        if(metadata.Items){
            dataSource.setItems(metadata.Items);
        }

    }
});