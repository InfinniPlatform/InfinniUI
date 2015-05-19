/**
 * @description Методы для форматоирования
 * @mixin
 */
var formatMixin = {
    /**
     * @memberOf formatMixin.prototype
     * @description Разделитель для форматирования коллекций
     */
    separator: ", ",

    /**
     * Форматирование объекта или коллекции объектов.
     * Для форматирования объекта вызывается метод formatValue
     *
     * @param {*} originalValue Форматируемое значение
     * @param {Culture} culture Культура
     * @param {String} format Строка форматирования
     * @returns {String}
     */
    format: function (originalValue, culture, format) {
        var result;

        if (originalValue !== null && typeof originalValue !== 'undefined' && originalValue.constructor === Array) {
            var values = [];
            for (var i = 0, ln = originalValue.length; i < ln; i = i + 1) {
                values.push(this.formatValue(originalValue[i], culture, format));
            }
            result = values.join(this.separator);
        } else {
            result = this.formatValue.apply(this, arguments);
        }

        return result;
    },

    getFormat: function () {
        return this.getPropertyValue('formatRule', this.defaultFormat);
    },

    setFormat: function (value) {
        this.formatRule = value;
    },

    /**
     * Получение значение свойства.
     * Возвращает установленное значение или defaultValue
     * @param name
     * @param defaultValue
     * @returns {*}
     */
    getPropertyValue: function (name, defaultValue) {
        var value = this[name];

        return (typeof value === 'undefined' || value === null) ? defaultValue : value;
    }

};