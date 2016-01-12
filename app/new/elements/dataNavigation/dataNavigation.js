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
    }

});