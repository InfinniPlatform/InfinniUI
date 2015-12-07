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

    toggle: function (toggle) {
        this.control.set('toggle', toggle);
    },

    setSelected: function (selected) {
        this.control.set('selected', selected);
    },

    setMultiSelect: function (multiSelect) {
        this.control.set('multiSelect', multiSelect);
    },

    onToggle: function (handler) {
        this.control.onToggle(handler);
    }

});

