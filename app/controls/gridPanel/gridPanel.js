var GridPanelControl = function () {
    _.superClass(GridPanelControl, this);
};

_.inherit(GridPanelControl, AbstractGridPanelControl);

_.extend(GridPanelControl.prototype, {
    createControlModel: function () {
        return new GridPanelModel();
    },

    createControlView: function (model) {
        return new GridPanelView({model: model});
    }
});
