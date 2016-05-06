var DocumentDataSourceBuilder = function() {
    _.superClass(DocumentDataSourceBuilder, this);
}

_.inherit(DocumentDataSourceBuilder, BaseDataSourceBuilder);

_.extend(DocumentDataSourceBuilder.prototype, {
    applyMetadata: function(builder, parent, metadata, dataSource){
        BaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);

        dataSource.setDocumentId(metadata['DocumentId']);

        if('PageNumber' in metadata){ dataSource.setPageNumber(metadata['PageNumber']); }
        if('PageSize' in metadata){ dataSource.setPageSize(metadata['PageSize']); }

        if('Filter' in metadata){ dataSource.setFilter(metadata['Filter']); }
        if('FilterParams' in metadata){
            var params = metadata['FilterParams'];
            for(var k in params){
                this.initBindingToProperty(params[k], dataSource, parent, '.filterParams.' + k, builder);
            }
        }

        if('Search' in metadata){ dataSource.setSearch(metadata['Search']); }
        if('Select' in metadata){ dataSource.setSelect(metadata['Select']); }
        if('Order' in metadata){ dataSource.setOrder(metadata['Order']); }
        if('NeedTotalCount' in metadata){ dataSource.setNeedTotalCount(metadata['NeedTotalCount']); }
    },

    createDataSource: function(parent){
        return new DocumentDataSource({
            view: parent
        });
    },

    initBindingToProperty: RestDataSourceBuilder.prototype.initBindingToProperty

    //initFileProvider: function (dataSource) {
    //    var fileProvider = window.providerRegister.build('DocumentFileProvider', {
    //        documentId: dataSource.getDocumentId(),
    //        configId: dataSource.getConfigId()
    //    });
    //
    //    dataSource.setFileProvider(fileProvider);
    //}
});
