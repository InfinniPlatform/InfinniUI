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

        if (Array.isArray(metadata.AvailablePageSizes)) {
            element.getAvailablePageSizes().reset(metadata.AvailablePageSizes);
        }

        var ds = this.findDataSource(params);
        if (ds) {
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
            parent = params.parent,
            view,
            context,
            dataSource;

        if (parent) {
            view = parent.getView()
        }
        if (name && view) {
            context = view.getContext();
            dataSource = context.dataSources[name];
        }

        return dataSource;
    }

});