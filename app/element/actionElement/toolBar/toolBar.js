function ToolBar(parentView) {
    _.superClass(ToolBar, this, parentView);
}

_.inherit(ToolBar, Element);

_.extend(ToolBar.prototype, {
    createControl: function () {
        return new ToolBarControl();
    },

    getHeight: function () {
        return 34;
    },

    addItem: function (item) {
        return this.control.addItem(item);
    }
});
