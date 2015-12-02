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

    setParent: function(parent){
        this.parent = parent;
    },

    setConfigId: function(configId) {
        return this.control.set('configId', configId);
    },

    getConfigId: function() {
        return this.control.get('configId');
    },

    setDocumentId: function(documentId) {
        return this.control.set('documentId', documentId);
    },

    getDocumentId: function() {
        return this.control.get('documentId');
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

    setSource: function (dataSource) {
        return this.control.set('dataSource', dataSource);
    },

    getSource: function () {
        return this.control.get('dataSource');
    },

    build: function (){
        this.control.controlView.renderDocument();
    }

}, valuePropertyMixin);