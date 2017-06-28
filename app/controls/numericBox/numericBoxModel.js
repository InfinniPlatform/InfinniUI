/**
 * @constructor
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

    /**
     *
     */
    incValue: function() {
        var delta = this.get( 'increment' );
        this.addToValue( delta );
    },

    /**
     *
     */
    decValue: function() {
        var delta = this.get( 'increment' );
        this.addToValue( -delta );
    },

    /**
     *
     * @param delta
     */
    addToValue: function( delta ) {
        var value = this.get( 'value' );
        var startValue = this.get( 'startValue' );
        var minValue = this.get( 'minValue' );
        var maxValue = this.get( 'maxValue' );
        var newValue = typeof value === 'number' ? value : +value;

        if ( this.isSetValue( value ) && typeof value === 'number' ) {
            newValue += delta;
        } else {
            newValue = ( typeof startValue === 'number' ) ? startValue : 0;
        }

        if ( typeof minValue === 'number' && newValue < minValue ) {
            newValue = minValue;
        } else if ( typeof maxValue === 'number' && newValue > maxValue ) {
            newValue = maxValue;
        }

        this.set( 'value', newValue );
    },

    /**
     *
     */
    initialize: function() {
        TextEditorBaseModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    },

    validate: function( attributes/*, options */ ) {
        var value = attributes.value;
        var min = attributes.minValue;
        var max = attributes.maxValue;
        var error;

        if ( value !== null && typeof value !== 'undefined' ) {
            if ( typeof min === 'number' && typeof max === 'number' ) {
                if ( value < min || value > max ) {
                    error = 'Значение должно быть в диапазоне от ' + min + ' до ' + max + '.';
                }
            } else if ( typeof min === 'number' && value < min ) {
                error = 'Значение должно быть не меньше ' + min + '.';
            } else if ( typeof max === 'number' && value > max ) {
                error = 'Значение должно быть не больше ' + max + '.';
            }
        }

        return error;
    }


} );

InfinniUI.NumericBoxModel = NumericBoxModel;
