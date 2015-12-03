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

DataGrid.prototype.createRow = function () {
    return new DataGridRow(this);
};

DataGrid.prototype.createControl = function () {
    return new DataGridControl();
};