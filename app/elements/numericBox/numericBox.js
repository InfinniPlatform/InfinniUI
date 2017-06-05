/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBase
 */
function NumericBox( parent ) {
    _.superClass( NumericBox, this, parent );
}

InfinniUI.NumericBox = NumericBox;

_.inherit( NumericBox, TextEditorBase );

/**
 *
 * @param parent
 * @returns {NumericBoxControl}
 */
NumericBox.prototype.createControl = function( parent ) {
    return new NumericBoxControl( parent );
};

/**
 * @returns {*}
 */
NumericBox.prototype.getMinValue = function() {
    return this.control.get( 'minValue' );
};

/**
 *
 * @param value
 */
NumericBox.prototype.setMinValue = function( value ) {
    this.control.set( 'minValue', value );
};

/**
 * @returns {*}
 */
NumericBox.prototype.getMaxValue = function() {
    return this.control.get( 'maxValue' );
};

/**
 *
 * @param value
 */
NumericBox.prototype.setMaxValue = function( value ) {
    this.control.set( 'maxValue', value );
};

/**
 * @returns {*}
 */
NumericBox.prototype.getIncrement = function() {
    return this.control.get( 'increment' );
};

/**
 *
 * @param value
 */
NumericBox.prototype.setIncrement = function( value ) {
    this.control.set( 'increment', value );
};

/**
 * @public
 * @description Устанваливает начальное значение
 * @param {Number} value
 */
NumericBox.prototype.setStartValue = function( value ) {
    this.control.set( 'startValue', value );
};

/**
 *
 * @param value
 * @returns {*}
 */
NumericBox.prototype.validateValue = function( value ) {
    var error;
    var min = this.getMinValue();
    var max = this.getMaxValue();

    value = this.convertValue( value );

    if( value === null || typeof value === 'undefined' ) {
        return error;
    }

    if( !_.isNumber( value ) ) {
        error = 'Значение должно быть числом';
    } else if( _.isNumber( min ) ) {
        if( _.isNumber( max ) ) {
            if( value < min || value > max ) {
                error = 'Значение должно быть от ' + min + ' до ' + max;
            }
        } else {
            if( value < min ) {
                error = 'Значение должно быть больше ' + min;
            }
        }
    } else {
        if( _.isNumber( max ) ) {
            if( value > max ) {
                error = 'Значение должно быть меьше ' + max;
            }
        }
    }

    return error;
};

/**
 *
 * @param value
 * @returns {null|*}
 */
NumericBox.prototype.convertValue = function( value ) {
    var val = ( value === null || value === '' || typeof value === 'undefined' ) ? null : +value;

    return _.isNumber( val ) ? val : null;
};

/**
 * @public
 * @description Возвращает начальное значение
 * @returns {Number}
 */
NumericBox.prototype.getStartValue = function() {
    return this.control.get( 'startValue' );
};
