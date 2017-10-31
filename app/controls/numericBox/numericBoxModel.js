/**
 * @constructor
 * @augments TextEditorBaseModel
 */
var NumericBoxModel = TextEditorBaseModel.extend( {

    defaults: _.defaults(
        {
            increment: 1,
            inputType: 'number',
            minValue: null,
            maxValue: null,
            isNeedValidation: false
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

    transformValue: function( value ) {
        var val = ( value === null || value === '' || typeof value === 'undefined' ) ? null : +value;

        return typeof val === 'number' ? val : null;
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
    }

} );

InfinniUI.NumericBoxModel = NumericBoxModel;
