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

DataGrid.prototype.createControl = function () {
    return new DataGridControl();
};