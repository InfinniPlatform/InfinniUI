function MenuBar(parentView) {
    _.superClass(MenuBar, this, parentView);
}

_.inherit(MenuBar, Element);

_.extend(MenuBar.prototype, {

    createControl: function () {
        return new MenuBarControl();
    },

    setItems: function (value) {
        return this.control.setItems(value);
    }

});