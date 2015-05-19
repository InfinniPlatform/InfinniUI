function MenuBar(parentView) {
    _.superClass(MenuBar, this, parentView);
}

_.inherit(MenuBar, Element);

_.extend(MenuBar.prototype, {

    createControl: function () {
        return new MenuBarControl();
    },

    setItems: function (value) {
        this.control.setItems(value);
    },

    setMenuList: function (list) {
        this.control.setMenuList(list);
    },

    getMenuList: function () {
        return this.control.getMenuList();
    },

    setMenuName: function (value) {
        this.control.setMenuName(value);
    },

    getMenuName: function () {
        return this.control.getMenuName();
    },

    getConfigId: function () {
        return this.control.getConfigId();
    },

    setConfigId: function (value) {
        this.control.setConfigId(value);
    },

    onChangeMenuName: function (handler) {
        if (typeof handler === 'function') {
            this.control.onChangeMenuName(handler);
        }
    },

    onChangeConfigId: function (handler) {
        if (typeof handler === 'function') {
            this.control.onChangeConfigId(handler);
        }
    },

    onChangeMenuList: function (handler) {
        if (typeof handler === 'function') {
            this.control.onChangeMenuList(handler);
        }
    }



});