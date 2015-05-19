function AbstractGridPanel(parentView) {
    _.superClass(AbstractGridPanel, this, parentView);
}

_.inherit(AbstractGridPanel, Element);

_.extend(AbstractGridPanel.prototype, {

    addRow: function(){
        var row = new GridRow();
        this.control.addRow(row);
        return row;
    },

    getRows: function(){
        return this.control.getRows();
    }

});
