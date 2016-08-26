function DataNavigation (parent) {
    _.superClass(DataNavigation, this, parent);
}

window.InfinniUI.DataNavigation = DataNavigation;

_.inherit(DataNavigation, Element);

_.extend(DataNavigation.prototype, {

    createControl: function () {
        return new DataNavigationControl();
    },

    getDataSource: function () {
        return this.control.get('dataSource');
    },

    setDataSource: function (value) {
        this.control.set('dataSource', value);
    },

    getAvailablePageSizes: function () {
        return this.control.get('availablePageSizes');
    },

    setPageNumber: function (value) {
        this.control.set('pageNumber', value)
    },

    getPageNumber: function () {
        return this.control.get('pageNumber');
    },

    onPageNumberChanged: function (handler) {
        this.control.onPageNumberChanged(this.createControlEventHandler(this, handler));
    },

    setPageSize: function (value) {
        this.control.set('pageSize', value)
    },

    getPageSize: function () {
        return this.control.get('pageSize');
    },

    onPageSizeChanged: function (handler) {
        this.control.onPageSizeChanged(this.createControlEventHandler(this, handler));
    },

    getPageCount: function () {
        return this.control.get('pageCount');
    },

    setPageCount: function (value) {
        this.control.set('pageCount', value)
    },

    getIsDataReady: function () {
        return this.control.get('isDataReady');
    },

    setIsDataReady: function (value) {
        this.control.set('isDataReady', value)
    }

});
