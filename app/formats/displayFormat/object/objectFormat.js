/**
 * @description Формат отображения объекта
 * @param {String} format Строка форматирования
 * @constructor
 * @mixes formatMixin
 */
function ObjectFormat( format ) {
    this.setFormat( format );
    this.formatters = [ DateTimeFormat, NumberFormat ];
}

InfinniUI.ObjectFormat = ObjectFormat;

_.extend( ObjectFormat.prototype, {

    /**
     * @private
     * @description Форматирует объект
     * @memberOf ObjectFormat.prototype
     * @param {*} originalValue Форматируемое значение
     * @param {*} culture Культура
     * @param {String} format Строка форматирования
     * @returns {String}
     */
    formatValue: function( originalValue, culture, format ) {
        culture = culture || localized;
        format = format || this.getFormat();

        var regexp = /\$\{[^}]*}/g;
        var trim = /^\$\{|\}$/g;
        var value = '';

        value = format.replace( regexp, this.formatIterator.bind( this, originalValue, culture ) );

        return value;
    },

    /**
     * @private
     * @description Форматирование каждого простого вхождения формата в строку форматирования объекта
     * @memberOf ObjectFormat.prototype
     * @param {*} originalValue Форматируемое значение
     * @param {*} culture
     * @param {String} match строка форматирования
     * @returns {String}
     */
    formatIterator: function( originalValue, culture, match ) {
        var regexp = /\$\{[^}]*}/g;
        var trim = /^\$\{|\}$/g;
        var result, text, formatter, value, parts;

        result = match;
        text = match.replace( trim, '' );
        parts = text.split( ':' );

        if( typeof originalValue === 'object' ) {
            value = ( parts[ 0 ] === '' ) ? originalValue : InfinniUI.ObjectUtils.getPropertyValue( originalValue, parts[ 0 ] );
        } else {
            value = originalValue;
        }

        if( parts.length === 2 ) {
            // Найдено "[Property]:Format"
            for( var i = 0, ln = this.formatters.length; i < ln; i = i + 1 ) {
                //Пытаемся по очереди отформатировать значение разными форматами
                formatter = new this.formatters[ i ]( parts[ 1 ] );
                formatter.setOptions( this.getOptions() );

                text = formatter.format( value, culture );
                if( text !== parts[ 1 ] ) {
                    //Если формат отформатировал строку - оставляем ее
                    result = text;
                    break;
                }
            }
        } else {
            // Найдено "[Property]"
            result = value;
        }

        return ( typeof result === 'undefined' || result === null ) ? '' : result;
    }

}, formatMixin );
