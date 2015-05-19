function Panel(parentView) {
    _.superClass(Panel, this, parentView);
}

_.inherit(Panel, Element);

_.extend(Panel.prototype, {
    createControl: function () {
        return new PanelControl();
    },

    setCollapsible: function (collapsible) {
        if(collapsible !== undefined) {
            return this.control.set('collapsible', collapsible);
        }
    },

    getCollapsible: function () {
        return this.control.get('collapsible');
    },

    setCollapsed: function (collapsed) {
        if(collapsed !== undefined) {
            return this.control.set('collapsed', collapsed);
        }
    },

    getCollapsed: function () {
        return this.control.get('collapsed');
    },

    addItem: function (item) {
        return this.control.addItem(item);
    },

    onExpanded: function (handler) {
        return this.control.onExpanded(handler);
    },

    onCollapsed: function (handler) {
        return this.control.onCollapsed(handler);
    }
});