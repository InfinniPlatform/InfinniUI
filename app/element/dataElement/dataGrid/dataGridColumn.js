/**
 * @description Элемент колонки DataGrid
 * @class DataGridColumn
 */
var DataGridColumn = function () {
    this.control = new DataGridColumnControl();
};

/**
 * @TODO Реализовать ItemFormat,ItemTemplate
 */

_.extend(DataGridColumn.prototype, {

    /**
     * @description Возвращает наименование колонки
     * @memberOf DataGridColumn.prototype
     * @returns {String}
     */
    getName: function () {
        return this.control.get('name');
    },

    /**
     * @description Устанавливает наименование колонки
     * @memberOf DataGridColumn.prototype
     * @param {String} value
     */
    setName: function (value) {
        if (_.isString(value)) {
            this.control.set('name', value);
        }
    },

    /**
     * @description Возвращает текст заголовка колонки.
     * @memberOf DataGridColumn.prototype
     * @returns {String}
     */
    getText: function () {
        return this.control.get('text');
    },

    /**
     * @description Устанавливает текст заголовка колонки
     * @memberOf DataGridColumn.prototype
     * @param {String} value
     */
    setText: function (value) {
        if (_.isString(value)) {
            this.control.set('text', value);
        }
    },

    getImage: function () {
        return this.control.get('image');
    },

    setImage: function (value) {
        if (typeof value !== 'undefined') {
            this.control.set('image', value);
        }
    },

    /**
     * @description Возвращает значение, определяющее, отображается ли колонка в таблице.
     * @memberOf DataGridColumn.prototype
     * @returns {Boolean}
     */
    getVisible: function () {
        return this.control.get('visible');
    },

    /**
     * @description Устанавливает значение, определяющее, отображается ли колонка в таблице.
     * @memberOf DataGridColumn.prototype
     * @param {Boolean} value
     */
    setVisible: function (value) {
        if (_.isBoolean(value)) {
            this.control.set('visible', value);
        }
    },

    getReadOnly: function () {
        return this.control.get('readOnly');
    },

    setReadOnly: function (value) {
        if (_.isBoolean(value)) {
            this.control.set('readOnly', value);
        }
    },

    getResizable: function () {
        return this.control.get('resizable');
    },

    setResizable: function (value) {
        if (_.isBoolean(value)) {
            this.control.set('resizable', value);
        }
    },

    /**
     * @description Устанавливает свойство элемента источника данных, которое хранит значение для отображения
     * @memberOf DataGridColumn.prototype
     * @param {String} value
     */
    setDisplayProperty: function (value) {
        if (_.isString(value)) {
            this.control.set('displayProperty', value);
        }
    },

    /**
     * @description Возвращает свойство элемента источника данных, которое хранит значение для отображения
     * @memberOf DataGridColumn.prototype
     * @returns {String}
     */
    getDisplayProperty: function () {
        return this.get('displayProperty');
    },

    /**
     * @description Устанавливает формат отображения элемента
     * @memberOf DataGridColumn.prototype
     * @param {Object} newFormat
     */
    setFormat: function (newFormat) {
        this.control.set('itemFormat', newFormat);
    },

    /**
     * @description Возвращает формат отображения элемента
     * @memberOf DataGridColumn.prototype
     * @returns {Object}
     */
    getFormat: function () {
        return this.control.get('itemFormat');
    },

    /**
     * @description Устанавливает конструктор для создания ItemTemplate
     * @param {Function} itemTemplate
     * @memberOf {DataGridColumn.prototype}
     */
    setItemTemplate: function (itemTemplate) {
        this.control.set('itemTemplate', itemTemplate);
    }

});
