    var editMaskMixin = {
    /**
     * Установка начального значения
     * @param value
     */
    reset: function (value) {
        this.value = value;
        this.buildTemplate(value);
    },

    /**
     * Генерация шаблона ввода текста для текущей маски
     */
    buildTemplate: function () {

    },

    /**
     * Получить редактируемое значение
     * @returns {*}
     */
    getValue: function () {
        return this.value;
    },

    getData: function () {
        return this.getValue();
    },

    /**
     * Переход к предыдущему полю ввода
     * @param position
     * @returns {boolean|number}
     */
    moveToPrevChar: function (position) {

        return false;
    },

    /**
     * Переход к следующему полю ввода
     * @param position
     * @returns {boolean|number}
     */
    moveToNextChar: function (position) {

        return false;
    },

    /**
     * Установить следующее значение в текущей позиции
     * @param position
     * @returns {boolean|number}
     */
    setNextValue: function (position) {

        return false;
    },

    /**
     * Установить предыдущее значение в текущей позиции
     * @param position
     * @returns {boolean|number}
     */
    setPrevValue: function (position) {

        return false;
    },

    /**
     * Удалить выделенный текст
     * @param position
     * @returns {boolean|number}
     */
    deleteSelectedText: function(position){

        return false;
    },

    /**
     * Удалить символ справа от позиции
     * @param position
     * @returns {boolean|number}
     */
    deleteCharRight: function (position) {

        return false;
    },

    /**
     * Удалить символ слева от позиции
     * @param position
     * @returns {boolean|number}
     */
    deleteCharLeft: function (position) {

        return false;
    },

    /**
     * Обработка нажатия символа в указанной позиции
     * @param char
     * @param position
     * @returns {boolean|number}
     */
    setCharAt: function (char, position) {

        return false;
    },

    /**
     * Обработка вставки текста в маску
     * @param clipboardText
     * @param position
     * @returns {boolean}
     */
    pasteStringToMask: function(clipboardText, position){

        return false;
    },

    /**
     * Переход к следующей доступной маске ввода
     * @param position
     * @returns {boolean|number}
     */
    getNextItemMask: function (position) {
        return false;
    },

    /**
     * Получить текст для отображения в элементе
     * @returns {string}
     */
    getText: function () {
        var text;

        if (this.value !== null && typeof this.value !== 'undefined') {
            text = String(this.value);
        }

        return text;
    },

    /**
     * Форматирование значения для заданной группы маски ввода
     * @param {*} value
     * @param {String} mask Маска для фоматтера this.format
     * @returns {String}
     */
    formatMask: function (value, mask) {
        return (value === null || typeof value === 'undefined') ? '' : value;
    },

    getNextIntValue: function (options, value) {
        options = options || {};
        var minValue = null,
            maxValue = null,
            step = (typeof options.step !== 'undefined') ? step : 1;
        if (typeof options.min !== 'undefined') {
            minValue = options.min;
        }
        if (typeof options.max !== 'undefined') {
            maxValue = options.max;
        }
        value = parseInt(value, 10);
        if (isNaN(value)) {
            value = (minValue === null) ? 0 : minValue;
        } else {
            value = value + step;
            if (maxValue !== null && value > maxValue) {
                value = maxValue;
            }
        }
        return value;
    },
    
    getPrevIntValue: function (options, value) {
        options = options || {};
        var minValue = null,
            step = (typeof options.step !== 'undefined') ? step : 1;
        if (typeof options.min !== 'undefined') {
            minValue = options.min;
        }
        value = parseInt(value, 10);
        if (isNaN(value)) {
            value = (minValue === null) ? 0 : minValue;
        } else {
            value = value - step;
            if (minValue !== null && value < minValue) {
                value = minValue;
            }
        }
        return value;
    },

    formatInt: function (options, value) {
        var width = (typeof options.width !== 'undefined') ? options.width : null;

        value = parseInt(value, 10);
        var text, ln;
        if (isNaN(value)) {
            value = '';
        }
        text = value.toString();
        ln = text.length;
        if (width !== null && ln < width) {
            text = Array(width - ln +1).join('0') + text;
        }
        return text;
    },

    /**
     * Проверка что маска была полностью заполнена
     * @param value
     * @returns {boolean}
     */
    getIsComplete: function (value) {

        return false;
    }

};