function DataGridRow() {
    _.superClass(DataGridRow, this);
}

_.inherit(DataGridRow, Element);


_.extend(DataGridRow.prototype, {

    createControl: function () {
        return new DataGridRowControl()
    },

    setCellTemplates: function (cellTemplates) {
        this.control.set('cellTemplates', cellTemplates);
    },

    setMultiSelect: function (multiSelect) {
        this.control.set('multiSelect', multiSelect);
    }

});

