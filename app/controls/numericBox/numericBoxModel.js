/**
 * @class
 * @augments TextEditorBaseModel
 */
var NumericBoxModel = TextEditorBaseModel.extend( {

    defaults: _.defaults(
        {
            increment: 1,
            inputType: 'number'
        },
        TextEditorBaseModel.prototype.defaults
    ),

    incValue: function() {
        var delta = this.get( 'increment' );
        this.addToValue( delta );
    },

    decValue: function() {
        var delta = this.get( 'increment' );
        this.addToValue( -delta );
    },

    addToValue: function( delta ) {
        var value = this.get( 'value' );
        var startValue = this.get( 'startValue' );
        var minValue = this.get( 'minValue' );
        var maxValue = this.get( 'maxValue' );
        var newValue = _.isNumber( value ) ? value : +value;

        if ( this.isSetValue( value ) && _.isNumber( value ) ) {
            newValue += delta;
        } else {
            newValue = ( _.isNumber( startValue ) ) ? startValue : 0;
        }

        if ( _.isNumber( minValue ) && newValue < minValue ) {
            newValue = minValue;
        } else if ( _.isNumber( maxValue ) && newValue > maxValue ) {
            newValue = maxValue;
        }

        this.set( 'value', newValue );
    },

    initialize: function() {
        TextEditorBaseModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    },

    validate: function( attributes/*, options */ ) {
        var value = attributes.value;
        var min = attributes.minValue;
        var max = attributes.maxValue;
        var error = void 0;

        if ( value !== null && typeof value !== 'undefined' ) {
            if ( _.isNumber( min ) && _.isNumber( max ) ) {
                if ( value < min || value > max ) {
                    error = 'Значение должно быть в диапазоне от ' + min + ' до ' + max + '.';
                }
            } else if ( _.isNumber( min ) && value < min ) {
                error = 'Значение должно быть не меньше ' + min + '.';
            } else if ( _.isNumber( max ) && value > max ) {
                error = 'Значение должно быть не больше ' + max + '.';
            }
        }

        return error;
    }


} );

InfinniUI.NumericBoxModel = NumericBoxModel;
