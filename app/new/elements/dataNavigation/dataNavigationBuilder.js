function DataNavigationBuilder () {
    _.superClass(DataNavigationBuilder, this);
}

_.inherit(DataNavigationBuilder, ElementBuilder);

_.extend(DataNavigationBuilder.prototype, {

    createElement: function (params) {
        return new DataNavigation(params.parent);
    },

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var element = params.element;
        var metadata = params.metadata;
        var dsTotalCount;
        var pageSize;
        var pageCount;

        if (Array.isArray(metadata.AvailablePageSizes)) {
            element.getAvailablePageSizes().reset(metadata.AvailablePageSizes);
        }

        var ds = this.findDataSource(params);
        if (ds) {

            ds.onItemsUpdated(function(){
                dsTotalCount = ds.getTotalCount();
                if(typeof dsTotalCount == 'number'){
                    pageSize = ds.getPageSize();
                    pageCount = Math.ceil(dsTotalCount/pageSize);
                    element.setPageCount(pageCount);
                    element.setPageNumber(ds.getPageNumber());
                }
                element.setIsDataReady(true);
            });

            if(ds.isDataReady()){
                dsTotalCount = ds.getTotalCount();
                if(typeof dsTotalCount == 'number'){
                    pageSize = ds.getPageSize();
                    pageCount = Math.ceil(dsTotalCount/pageSize);
                    element.setPageCount(pageCount);
                }
                element.setIsDataReady(true);
            }

            element.setDataSource(ds);
            element.setPageNumber(ds.getPageNumber());
            element.setPageSize(ds.getPageSize());

            element.onPageNumberChanged(function (context, message) {
                ds.setPageNumber(message.value);
            });

            element.onPageSizeChanged(function (context, message) {
                ds.setPageSize(message.value);
            });
        } else {
            console.error('DataSource not found');
        }

    },

    findDataSource: function (params) {
        var
            name = params.metadata.DataSource,
            view = params.parentView,
            context,
            dataSource;
        
        if (name && view) {
            context = view.getContext();
            dataSource = context.dataSources[name];
        }

        return dataSource;
    }

});