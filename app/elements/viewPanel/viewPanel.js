function ViewPanel(parent) {
    _.superClass(ViewPanel, this, parent);
}

window.InfinniUI.ViewPanel = ViewPanel;

_.inherit(ViewPanel, Element);

_.extend(ViewPanel.prototype, {

    setLayout: function (layout) {
        var oldLayout = this.getLayout();

        if(oldLayout) {
            oldLayout.close();
        }

        this.control.set('layout', layout);
    },

    getLayout: function () {
        return this.control.get('layout');
    },

    createControl: function () {
        return new ViewPanelControl();
    }

});
