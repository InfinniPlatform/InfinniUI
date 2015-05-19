var SearchPanelControl = function () {
    _.superClass(SearchPanelControl, this);
};

_.inherit(SearchPanelControl, Control);

_.extend(SearchPanelControl.prototype, {
    createControlModel: function () {
        return new SearchPanelModel();
    },

    createControlView: function (model) {
        return new SearchPanelView({model: model});
    },

    onValueChanged: function (handler) {
        this.controlView.on('onValueChanged', handler);
    }
});