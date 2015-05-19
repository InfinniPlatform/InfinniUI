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
    },

    setMenuList: function (list) {
        this.controlModel.set('menus', list);
    },

    getMenuList: function () {
        return this.controlModel.get('menus');
    },

    setMenuName: function (value) {
        this.controlModel.set('menuName', value);
    },

    getMenuName: function () {
        return this.controlModel.get('menuName');
    },

    setConfigId: function (value) {
        this.controlModel.set('configId', value);
    },

    getConfigId: function () {
        return this.controlModel.get('configId');
    },

    onChangeConfigId: function (handler) {
        this.controlModel.on('change:configId', handler);
    },

    onChangeMenuName: function (handler) {
        this.controlModel.on('change:menuName', handler);
    },

    onChangeMenuList: function (handler) {
        this.controlModel.on('change:menus', handler);
    }

});