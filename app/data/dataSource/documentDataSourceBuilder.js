var DocumentDataSourceBuilder = function() {
    _.superClass(DocumentDataSourceBuilder, this);
}

_.inherit(DocumentDataSourceBuilder, newBaseDataSourceBuilder);

_.extend(DocumentDataSourceBuilder.prototype, {
    applyMetadata: function(builder, parent, metadata, dataSource){
        newBaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);

        dataSource.setDocumentId(metadata['DocumentId']);

        if('PageNumber' in metadata){ dataSource.setPageNumber(metadata['PageNumber']); }
        if('PageSize' in metadata){ dataSource.setPageSize(metadata['PageSize']); }

        if('Filter' in metadata){ dataSource.setFilter(metadata['Filter']); }
        if('FilterParams' in metadata){ dataSource.setFilterParams(metadata['FilterParams']); }

        if('Search' in metadata){ dataSource.setSearch(metadata['Search']); }
        if('Select' in metadata){ dataSource.setSelect(metadata['Select']); }
        if('Order' in metadata){ dataSource.setOrder(metadata['Order']); }
        if('Count' in metadata){ dataSource.setOrder(metadata['Count']); }



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
