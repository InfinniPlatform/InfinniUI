function DataNavigation (parent) {
    _.superClass(DataNavigation, this, parent);
}

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
    }

});