function DocumentViewer(parentView) {
    _.superClass(DocumentViewer, this, parentView);
}

_.inherit(DocumentViewer, Element);

_.extend(DocumentViewer.prototype, {

    createControl: function () {
        return new DocumentViewerControl();
    },

    setView: function (view) {
        return this.control.set('view', view);
    },

    setPrintViewType: function(viewType) {
        return this.control.set('viewType', viewType);
    },

    getPrintViewType: function() {
        return this.control.get('viewType');
    },

    setPrintViewId: function(viewId) {
        return this.control.set('viewId', viewId);
    },

    getPrintViewId: function() {
        return this.control.get('viewId');
    },

    setDataSource: function (dataSource) {
        return this.control.set('dataSource', dataSource);
    },

    getDataSource: function () {
        return this.control.get('dataSource');
    }

});