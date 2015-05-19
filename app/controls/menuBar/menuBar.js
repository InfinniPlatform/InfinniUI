var MenuBarControl = function () {
    _.superClass(MenuBarControl, this);
};

_.inherit(MenuBarControl, Control);

_.extend(MenuBarControl.prototype, {

    createControlModel: function () {
        return new MenuBarModel();
    },

    createControlView: function (model) {
        return new MenuBarView({model: model});
    },

    setItems: function (items) {
        this.controlModel.setItems(items);
    },

    getItems: function () {
        return this.controlModel.getItems();
    },

    getChildElements: function () {
        return this.getItems();
    }
});