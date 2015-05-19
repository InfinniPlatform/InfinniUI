function SearchPanel(parentView) {
    _.superClass(SearchPanel, this, parentView);
}

_.inherit(SearchPanel, Element);

_.extend(SearchPanel.prototype, {

    createControl: function () {
        return new SearchPanelControl();
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

    getHeight: function () {
        return 44;
    }

}, valuePropertyMixin);