function DataNavigation(parentView) {
    _.superClass(DataNavigation, this, parentView);
}

_.inherit(DataNavigation, Element);

_.extend(DataNavigation.prototype, {
    createControl: function () {
        return new DataNavigationControl();
    },

    getPageNumber: function () {
        return this.control.get('pageNumber');
    },

    setPageNumber: function (pageNumber) {
        this.control.set('pageNumber', pageNumber);
    },

    getPageSize: function () {
        return this.control.get('pageSize');
    },

    setPageSize: function (pageSize) {
        this.control.set('pageSize', pageSize);
    },

    getAvailablePageSizes: function () {
        return this.control.get('availablePageSizes');
    },

    setAvailablePageSizes: function (availablePageSizes) {
        this.control.set('availablePageSizes', availablePageSizes);
    },

    setDataSource: function (dataSource) {
        return this.control.set('dataSource', dataSource);
    },

    getDataSource: function () {
        return this.control.get('dataSource');
    },

    setView: function (view) {
        return this.control.set('view', view);
    },

    getView: function () {
        return this.control.get('view');
    },

    onGetElementCount: function (handler) {
        return this.control.onGetElementCount(handler);
    },

    onUpdateItems: function (handler) {
        this.control.onUpdateItems(handler);
    },

    onSetPageNumber: function (handler) {
        this.control.onSetPageNumber(handler);
    },

    onSetPageSize: function (handler) {
        this.control.onSetPageSize(handler);
    }
});
