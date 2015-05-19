/**
 * @description Элемент представления для отображения данных в виде таблицы
 * @param {View} parentView
 * @class DataGrid
 */
function DataGrid(parentView) {
    this.onValueChangedHandlers = [];

    _.superClass(DataGrid, this, parentView);
}

_.inherit(DataGrid, Element);

_.extend(DataGrid.prototype, {

    /**
     * @description Создает экземпляр контрола отображения данных в виде таблицы
     * @memberOf DataGrid.prototype
     * @returns {DataGridControl}
     */
    createControl: function () {
        return new DataGridControl();
    },

    getColumn: function (name) {
        /** @TODO Не реализовано getColumn() */

    },

    /**
     * @description Возвращает список колонок таблицы.
     * @memberOf DataGrid.prototype
     * @returns {DataGridColumn[]}
     */
    getColumns: function () {
        return this.control.get('columns');
    },

    /**
     * @description Устанавливает список колонок таблицы
     * @memberOf DataGrid.prototype
     * @param {DataGridColumn[]} value
     */
    setColumns: function (value) {
        if (_.isArray(value)) {
            this.control.set('columns', value);
        }
    },

    /**
     * @description Возвращает значение, определяющее, возможен ли выбор нескольких значений.
     * @memberOf DataGrid.prototype
     * @returns {Boolean}
     */
    getMultiSelect: function () {
        return this.control.get('multiSelect');
    },

    /**
     * @description Устанавливает значение, определяющее, возможен ли выбор нескольких значений.
     * @memberOf DataGrid.prototype
     * @param {Boolean} value
     */
    setMultiSelect: function (value) {
        if (typeof value !== 'undefined') {
            this.control.set('multiSelect', value);
        }
    },

    /**
     * @description Возвращает значение, определяющее, запрещено ли редактирование значения.
     * @memberOf DataGrid.prototype
     * @returns {Boolean}
     */
    getReadOnly: function () {
        return this.control.get('readOnly');
    },

    /**
     * @description Устанавливает значение, определяющее, запрещено ли редактирование значения.
     * @memberOf DataGrid.prototype
     * @param {Boolean} value
     */
    setReadOnly: function (value) {
        if (typeof value !== 'undefined') {
            this.control.set('readOnly', value);
        }
    },

    /**
     * @description Возвращает свойство элемента источника данных, которое хранит значение для выбора.
     * @memberOf DataGrid.prototype
     * @returns {String}
     */
    getValueProperty: function () {
        return this.control.get('valueProperty');
    },

    /**
     * @description Устанавливает свойство элемента источника данных, которое хранит значение для выбора.
     * @memberOf DataGrid.prototype
     * @param {String} value
     */
    setValueProperty: function (value) {
        this.control.set('valueProperty', value);
    },

    /**
     * @description Возвращает выбранное значение
     * @memberOf DataGrid.prototype
     * @returns {*}
     */
    getValue: function () {
        return this.control.get('value');
    },

    /**
     * @description Устанавливает выбранное значение
     * @memberOf DataGrid.prototype
     * @param {*} value
     */
    setValue: function (value) {
        if (this.getMultiSelect() === false) {
            this.control.set('selectedItem', value);
        }
        this.control.set('value', value);
    },

    /**
     * @description Очищает выбранное значение
     * @memberOf DataGrid.prototype
     */
    clearValue: function () {
        this.control.unset('value');
    },

    /**
     * @description Возвращает список значений для выбора.
     * @memberOf DataGrid.prototype
     * @returns {Array}
     */
    getItems: function () {
        return this.control.get('items');
    },

    /**
     * @description Устанавливает список значений для выбора.
     * @memberOf DataGrid.prototype
     * @param {Array} items
     */
    setItems: function (items) {
        if (_.isArray(items)) {
            this.control.set('items', _.deepClone(items));
        } else {
            this.control.set('items', []);
        }
    },

    /**
     * @description Установка обработчика изменения значения
     * @memberOf DataGrid.prototype
     * @param {Function} callback
     */
    onValueChanged: function (callback) {
        this.control.onValueChanged(callback);
    },

    /**
     * @description Установка обработчика изменения на двойной клик
     * @memberOf DataGrid.prototype
     * @param {Function} callback
     */
    onDoubleClick: function (callback) {
        this.control.onDoubleClick(callback);
    },

    /**
     * @description Устанавливает конструктор для создания ItemTemplate
     * @param {Function} itemTemplate
     * @memberOf {DataGrid.prototype}
     */
    setItemTemplate: function (itemTemplate) {
        this.control.set('itemTemplate', itemTemplate);
    },

    setFormat: function (newFormat) {
        this.control.set('itemFormat', newFormat);
    },


    setGroups: function (groups) {
        this.control.set('groups', groups);
    },

    getGroups: function (groups) {
        return this.control.get('groups');
    },

    setCustomColors: function (customColors) {
        this.control.set('customColors', customColors);
    },

    setPopUpMenu: function (popupMenu) {
        this.control.set('popupMenu', popupMenu);
    },

    setAutoLoad: function (isAutoLoad) {
        this.control.set('autoLoad', isAutoLoad);
    },
    onScrollToTheEnd: function(handler){
        this.control.onScrollToTheEnd(handler);
    },

    onSelectedItemChanged: function (handler) {
        this.control.onSelectedItemChanged(handler);
    },

    setSelectedItem: function (value) {
        this.control.set('selectedItem', value);
        if (this.getMultiSelect() === false) {
            this.control.set('value', value);
        }
    },

    getSelectedItem: function () {
        return this.control.get('selectedItem');
    },

    setComparator: function (value) {
        this.control.set('comparator', value);
    }


});
