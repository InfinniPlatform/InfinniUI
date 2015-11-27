function DataGridRow() {
    _.superClass(DataGridRow, this);
}

_.inherit(DataGridRow, Element);


_.extend(DataGridRow.prototype, {

    createControl: function () {
        return new DataGridRowControl()
    }

});

