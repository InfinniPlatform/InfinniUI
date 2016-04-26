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

/**
 * @description Устанавливает значение, определяющее виден ли элемент "Выбрать все" в шапке таблицы.
 * @param {boolean} value
 */
DataGrid.prototype.setCheckAllVisible = function (value) {
    if (_.isBoolean(value)) {
        this.control.set('checkAllVisible', value);
    }
};

/**
 * @description Возвращает значение, определяющее виден ли элемент "Выбрать все" в шапке таблицы.
 * @returns {boolean}
 */
DataGrid.prototype.getCheckAllVisible = function () {
    return this.control.get('checkAllVisible');
};

/**
 * @description Возвращает состояние элемента "Выбрать все" из шапки таблицы
 * @returns {boolean}
 */
DataGrid.prototype.getCheckAll = function () {
    return this.control.get('checkAll');
};

/**
 * @description Устанавливает обработчик события о том, что изменилось состояние элемента "Выбрать все" в шапке таблицы
 * @param {function} handler
 */
DataGrid.prototype.onCheckAllChanged = function (handler) {
    this.control.onCheckAllChanged(this.createControlEventHandler(this, handler));
};

DataGrid.prototype.createControl = function () {
    return new DataGridControl();
};