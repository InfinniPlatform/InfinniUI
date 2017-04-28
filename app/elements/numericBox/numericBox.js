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

NumericBox.prototype.createControl = function( parent ) {
    return new NumericBoxControl( parent );
};

NumericBox.prototype.getMinValue = function() {
    return this.control.get( 'minValue' );
};

NumericBox.prototype.setMinValue = function( value ) {
    this.control.set( 'minValue', value );
};

NumericBox.prototype.getMaxValue = function() {
    return this.control.get( 'maxValue' );
};

NumericBox.prototype.setMaxValue = function( value ) {
    this.control.set( 'maxValue', value );
};

NumericBox.prototype.getIncrement = function() {
    return this.control.get( 'increment' );
};

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
