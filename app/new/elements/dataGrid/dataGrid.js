function DataGrid(parent) {
    _.superClass(DataGrid, this, parent);
}

_.inherit(DataGrid, ListEditorBase);

/**
 * Возвращает коллекцию колонок таблицы {@see DataGridColumn}
 * @returns {Collection}
 */
DataGrid.prototype.getColumns = function () {
    return this.control.get('columns');
};

DataGrid.prototype.setShowSelectors = function (value) {
    if (typeof value !== 'undefined' && value !== null) {
        this.control.set('showSelectors', !!value);
    }
};

DataGrid.prototype.getShowSelectors = function () {
    return this.control.get('showSelectors');
};

DataGrid.prototype.createRow = function () {
    return new DataGridRow(this);
};

DataGrid.prototype.createControl = function () {
    return new DataGridControl();
};