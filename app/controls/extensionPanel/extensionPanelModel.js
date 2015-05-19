var ExtensionPanelModel = ControlModel.extend({
    defaults: _.extend({
        extensionName: null,
        context: null
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }
});