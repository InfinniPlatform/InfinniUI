var DocumentDataSourceBuilder = function() {
    _.superClass(DocumentDataSourceBuilder, this);
};

_.inherit(DocumentDataSourceBuilder, BaseDataSourceBuilder);

_.extend(DocumentDataSourceBuilder.prototype, {
    applyMetadata: function(builder, parent, metadata, dataSource){
        BaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);

        dataSource.setDocumentId(metadata['DocumentId']);

        if('Select' in metadata){ dataSource.setSelect(metadata['Select']); }
        if('Order' in metadata){ dataSource.setOrder(metadata['Order']); }
        if('NeedTotalCount' in metadata){ dataSource.setNeedTotalCount(metadata['NeedTotalCount']); }

        if('PageSize' in metadata){ dataSource.setPageSize(metadata['PageSize']); }
        // PageNumber нужно устанавливать последним, потому что его могут обнулять другие свойства.
        if('PageNumber' in metadata){ dataSource.setPageNumber(metadata['PageNumber']); }

        if (Array.isArray(metadata.DefaultItems)) {
            dataSource._setItems(metadata.DefaultItems);
        }
    },

    createDataSource: function(parent){
        return new DocumentDataSource({
            view: parent
        });
    }

});

window.InfinniUI.DocumentDataSourceBuilder = DocumentDataSourceBuilder;
