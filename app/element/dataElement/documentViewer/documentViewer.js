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

    setPrintViewId: function(viewId) {
        return this.control.set('viewId', viewId);
    },

    getPrintViewId: function() {
        return this.control.get('viewId');
    },

    setSource: function (dataSource) {
        return this.control.set('dataSource', dataSource);
    },

    getSource: function () {
        return this.control.get('dataSource');
    },

    build: function (){
        this.control.renderDocument();
    }

}, valuePropertyMixin);