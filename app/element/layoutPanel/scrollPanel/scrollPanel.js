function ScrollPanel(parentView) {
    _.superClass(ScrollPanel, this, parentView);
}

_.inherit(ScrollPanel, Element);

_.extend(ScrollPanel.prototype, {
    createControl: function () {
        return new ScrollPanelControl();
    },
    
    getVerticalScroll: function () {
        return this.control.get('verticalScroll');
    },

    setVerticalScroll: function (value) {
        if (typeof value == 'string') {
            this.control.set('verticalScroll', value);
        }
    },

    getHorizontalScroll: function () {
        return this.control.get('horizontalScroll');
    },

    setHorizontalScroll: function (value) {
        if (typeof value == 'string') {
            this.control.set('horizontalScroll', value);
        }
    },

    getLayoutPanel: function () {
        return this.control.get('layoutPanel');
    },

    setLayoutPanel: function (value) {
        this.control.set('layoutPanel', value);
    }
});