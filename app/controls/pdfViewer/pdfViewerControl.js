var PdfViewerControl = function () {
    _.superClass(PdfViewerControl, this);
};

_.inherit(PdfViewerControl, Control);

_.extend(PdfViewerControl.prototype, {
    createControlModel: function () {
        return new PdfViewerModel();
    },

    createControlView: function (model) {
        return new PdfViewerView({model: model});
    },

    onValueChanged: function(handler){
        this.controlModel.on('change:value', handler);
    }
});