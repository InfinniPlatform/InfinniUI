/**
 * @description Формат отображения логического значения.
 * @constructor
 * @mixes formatMixin
 */
var BooleanFormat = function() {
};

InfinniUI.BooleanFormat = BooleanFormat;

_.extend( BooleanFormat.prototype, {

    /**
     * @description Текст для отображения истинного значения
     * @memberOf BooleanFormat.prototype
     */
    defaultTrueText: 'True',

    /**
     * @description Текст для отображения ложного значения
     * @memberOf BooleanFormat.prototype
     */
    defaultFalseText: 'False',

    /**
     * @description Возвращает текст для отображения ложного значения.
     * @memberOf BooleanFormat.prototype
     * @returns {String}
     */
    getFalseText: function() {
        return this.getPropertyValue( 'falseText', this.defaultFalseText );
    },

    /**
     * @description Устанавливает текст для отображения ложного значения.
     * @memberOf BooleanFormat.prototype
     * @param {String} value
     */
    setFalseText: function( value ) {
        this.falseText = value;
    },

    /**
     * @description Возвращает текст для отображения истинного значения.
     * @memberOf BooleanFormat.prototype
     * @returns {String}
     */
    getTrueText: function() {
        return this.getPropertyValue( 'trueText', this.defaultTrueText );
    },

    /**
     * @description Устанавливает текст для отображения истинного значения
     * @memberOf BooleanFormat.prototype
     * @param {String} value
     */
    setTrueText: function( value ) {
        this.trueText = value;
    },

    /**
     * @description Форматирует значение
     * @memberOf BooleanFormat.prototype
     * @param {Boolean} originalValue
     * @returns {String}
     */
    formatValue: function( originalValue ) {
        if( originalValue === false || originalValue === null || typeof originalValue === 'undefined' ) {
            return this.getFalseText();
        } else {
            return this.getTrueText();
        }
    }

}, formatMixin );
