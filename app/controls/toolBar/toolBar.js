var ToolBarControl = function () {
    _.superClass(ToolBarControl, this);
};

_.inherit(ToolBarControl, Control);

_.extend(ToolBarControl.prototype, {
    createControlModel: function () {
        return new ToolBarModel();
    },

    createControlView: function (model) {
        return new ToolBarView({model: model});
    },

    addItem: function (item) {
        this.controlModel.addItem(item);
    }
});