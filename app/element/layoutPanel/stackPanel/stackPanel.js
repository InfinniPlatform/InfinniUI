/*function StackPanel(parentView) {
    _.superClass(StackPanel, this, parentView);
}

_.inherit(StackPanel, Element);

_.extend(StackPanel.prototype, {

    createControl: function () {
        return new StackPanelControl();
    },

    addItem: function (item) {
        return this.control.addItem(item);
    },

    getOrientation: function () {
        return this.control.get('orientation');
    },

    setOrientation: function (orientation) {
        if (typeof orientation == 'string') {
            this.control.set('orientation', orientation);
        }
    }

});
*/