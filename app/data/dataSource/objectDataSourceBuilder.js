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

        if(!'IsLazy' in metadata){
            dataSource.setIsLazy(false);
        }

        if(metadata.Items){
            if($.isArray(metadata.Items)){
                dataSource.setItems(metadata.Items);
            }

            if($.isPlainObject(metadata.Items)){
                var binding = builder.buildBinding(metadata.Items, {
                    parentView: parent
                });

                binding.setMode(InfinniUI.BindingModes.toElement);

                binding.bindElement(dataSource, '');
            }

        }

    }

    //initFileProvider: function (dataSource) {
    //    var fileProvider = window.providerRegister.build('DocumentFileProvider', {
    //        documentId: "documentId",
    //        configId: "configId"
    //    });
    //
    //    dataSource.setFileProvider(fileProvider);
    //}
});