function PdfViewer(parentView) {
    _.superClass(PdfViewer, this, parentView);
}

_.inherit(PdfViewer, Element);

_.extend(PdfViewer.prototype, {

    createControl: function () {
        return new PdfViewerControl();
    },

    setUrl: function (url) {
        return this.control.set('url', url);
    }

}, valuePropertyMixin);