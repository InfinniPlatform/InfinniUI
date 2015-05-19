function ViewPanel(parentView) {
    _.superClass(ViewPanel, this, parentView);
}

_.inherit(ViewPanel, Element);

_.extend(ViewPanel.prototype, {

    setLayout: function (layout) {
        this.control.set('layout', layout);
    },

    getLayout: function () {
        return this.control.get('layout');
    },

    createControl: function () {
        return new ViewPanelControl();
    }

});