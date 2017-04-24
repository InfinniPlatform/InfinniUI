/**
 * @description Формат отображения числового значения.
 * @param {String} format Строка форматирования
 * @class NumberFormat
 * @mixes formatMixin
 */
function NumberFormat( format ) {
    this.setFormat( format );
}

InfinniUI.NumberFormat = NumberFormat;

_.extend( NumberFormat.prototype, {

    /**
     * @description Строка форматирования числового значения по умолчанию
     * @memberOf NumberFormat.prototype
     */
    defaultFormat: 'n',

    /**
     * @description Форматирует числовое значение
     * @memberOf NumberFormat.prototype
     * @param {Number} originalValue Форматируемое значение
     * @param {Culture} [culture] Культура
     * @param {String} [format] Строка форматирования
     * @returns {String}
     */
    formatValue: function( originalValue, culture, format ) {
        if ( typeof originalValue === 'undefined' || originalValue === null ) {
            return '';
        }
        var self = this;

        culture = culture || localized;

        format = format || this.getFormat();

        return format.replace( this.rg, function( s, formatName, formatParam ) {
            if( formatParam !== undefined && formatParam != '' ) {
                formatParam = parseInt( formatParam );
            }else{
                formatParam = undefined;
            }
            return self.rules[ formatName ].call( self, originalValue, formatParam, culture );
        } );
    },

    rg: /^([pnc])(\d*)$/ig,

    rules: {
        'P': function( val, param, culture ) {
            param = ( param !== undefined ) ? param : culture.numberFormatInfo.percentDecimalDigits;
            var isPositive = val >= 0,
                formattedNumber = this.formatNumber( Math.abs( val ), param, culture.numberFormatInfo.percentGroupSeparator, culture.numberFormatInfo.percentDecimalSeparator ),
                result;

            if( isPositive ) {
                result = culture.numberFormatInfo.percentPositivePattern.replace( 'p', formattedNumber );
            }else{
                result = culture.numberFormatInfo.percentNegativePattern.replace( 'p', formattedNumber );
            }

            result = result.replace( '%', culture.numberFormatInfo.percentSymbol );

            return result;
        },
        'p': function( val, param, culture ) {
            val *= 100;
            return this.rules.P.call( this, val, param, culture );
        },
        'n': function( val, param, culture ) {
            param = ( param !== undefined ) ? param : culture.numberFormatInfo.numberDecimalDigits;
            var isPositive = val >= 0,
                formattedNumber = this.formatNumber( Math.abs( val ), param, culture.numberFormatInfo.numberGroupSeparator, culture.numberFormatInfo.numberDecimalSeparator ),
                result;

            if( isPositive ) {
                result = culture.numberFormatInfo.numberPositivePattern.replace( 'n', formattedNumber );
            }else{
                result = culture.numberFormatInfo.numberNegativePattern.replace( 'n', formattedNumber );
            }

            return result;
        },
        'N': function() {
            return this.rules.n.apply( this, arguments );
        },
        'c': function( val, param, culture ) {
            param = ( param !== undefined ) ? param : culture.numberFormatInfo.currencyDecimalDigits;
            var isPositive = val >= 0,
                formattedNumber = this.formatNumber( Math.abs( val ), param, culture.numberFormatInfo.currencyGroupSeparator, culture.numberFormatInfo.currencyDecimalSeparator ),
                result;

            if( isPositive ) {
                result = culture.numberFormatInfo.currencyPositivePattern.replace( 'c', formattedNumber );
            }else{
                result = culture.numberFormatInfo.currencyNegativePattern.replace( 'c', formattedNumber );
            }
            result = result.replace( '$', culture.numberFormatInfo.currencySymbol );

            return result;
        },
        'C': function() {
            return this.rules.c.apply( this, arguments );
        }
    },

    /**
     * @protected
     * @description Форматирует числовое значение
     * @memberOf NumberFormat.prototype
     * @param {Number} val Значение
     * @param {Number} capacity Количество знаков в дробной части
     * @param {Number} groupSeparator Разделитель между группами
     * @param {String} decimalSeparator Разделитель между целой и дробной частью
     * @returns {String}
     */
    formatNumber: function( val, capacity, groupSeparator, decimalSeparator ) {
        val = val.toFixed( capacity );

        var stringOfVal = val.toString();
        var splittedVal = stringOfVal.split( '.' );
        var intPath = this.formatIntPath( splittedVal[ 0 ], groupSeparator );
        var fractPath = this.formatFractPath( splittedVal[ 1 ], decimalSeparator, capacity );

        return intPath + fractPath;
    },

    /**
     * @protected
     * @description Форматирует целую часть числа
     * @memberOf NumberFormat.prototype
     * @param {String} intPath Целая часть числа
     * @param {String} splitter Разделитель между группами
     * @returns {String}
     */
    formatIntPath: function( intPath, splitter ) {
        return intPath.replace( /(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '$1' + splitter );
    },

    /**
     * @protected
     * @description Форматирует дробную часть числа
     * @memberOf NumberFormat.prototype
     * @param {String} fractPath Дробная часть числа
     * @param {String} splitter Разделитель между целой и дробной частью
     * @param {Number} capacity Количество знаков в дробной части
     * @returns {string}
     */
    formatFractPath: function( fractPath, splitter, capacity ) {
        var result = fractPath ? fractPath : '';
        var postfix;

        if( capacity == 0 ) {
            return '';
        }

        if( result.length >= capacity ) {
            return splitter + result.substr( 0, capacity );
        }

        postfix = Math.pow( 10, capacity - result.length );
        postfix = postfix.toString().substr( 1 );
        return splitter + result + postfix;
    }

}, formatMixin );
