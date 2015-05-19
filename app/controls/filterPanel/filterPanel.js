var FilterPanelControl = function () {
    _.superClass(FilterPanelControl, this);
};

_.inherit(FilterPanelControl, Control);

_.extend(FilterPanelControl.prototype, {
    createControlModel: function () {
        return new FilterPanelModel();
    },

    createControlView: function (model) {
        return new FilterPanelView({model: model});
    },

    onValueChanged: function (handler) {
        this.controlView.on('onValueChanged', handler);
    }
});