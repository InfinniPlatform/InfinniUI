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
    },

    setItems: function(items){
        this.controlModel.setItems(items);
    },

    getChildElements: function () {
        return this.controlModel.getItems();
    },

    onEnabledChange: function (handler) {
        this.controlModel.on('change:enabled', handler);
    }
});