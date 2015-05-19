/**
 * @description Класс колонки контрола для {@link DataGrid}
 * @class DataGridColumnControl
 */
var DataGridColumnControl = function () {
    this.controlModel = new DataGridColumnModel();
};

_.extend(DataGridColumnControl.prototype, {

    /**
     * @description Получает значение метаданных по имени
     * @memberOf DataGridColumnControl.prototype
     * @param {String} name
     * @returns {*}
     */
    get: function (name) {
        return this.controlModel.get(name);
    },

    /**
     * @description Устанавливает значение метаданных
     * @memberOf DataGridColumnControl.prototype
     * @param {String} name
     * @param {*} value
     */
    set: function (name, value) {
        this.controlModel.set(name, value);
    }

});
