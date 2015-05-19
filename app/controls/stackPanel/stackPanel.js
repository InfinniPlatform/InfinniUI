var StackPanelControl = function () {
    _.superClass(StackPanelControl, this);
};

_.inherit(StackPanelControl, Control);

_.extend(StackPanelControl.prototype, {
    createControlModel: function () {
        return new StackPanelModel();
    },

    createControlView: function (model) {
        return new StackPanelView({model: model});
    },

    addItem: function (item) {
        this.controlModel.addItem(item);
    },

    getItems: function () {
        return this.controlModel.getItems();
    },

    getChildElements: function () {
        return this.getItems();
    }
});