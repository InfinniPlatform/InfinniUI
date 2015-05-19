var DocumentViewerControl = function () {
    _.superClass(DocumentViewerControl, this);
};

_.inherit(DocumentViewerControl, Control);

_.extend(DocumentViewerControl.prototype, {
    createControlModel: function () {
        return new DocumentViewerModel();
    },

    createControlView: function (model) {
        return new DocumentViewerView({model: model});
    }
});