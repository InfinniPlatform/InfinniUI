var ExtensionPanelControl = function () {
    _.superClass(ExtensionPanelControl, this);
};

_.inherit(ExtensionPanelControl, Control);

_.extend(ExtensionPanelControl.prototype, {

    createControlModel: function () {
        return new ExtensionPanelModel();
    },

    createControlView: function (model) {
        return new ExtensionPanelView({model: model});
    }
});