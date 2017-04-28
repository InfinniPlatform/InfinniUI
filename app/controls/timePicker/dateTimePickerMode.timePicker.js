console.assert( dateTimePickerModeTime, 'dateTimePickerModeTime is undefined' );

/**
 * @constructor
 * @mixes dateTimePickerModeTime
 */
var dateTimePickerModeTimePicker = _.extend( {}, dateTimePickerModeTime, {

    /**
     *
     * @param value
     * @returns {*}
     */
    convertValue: function( value ) {
        var _value = null;
        if ( value && value.constructor === Date ) {
            _value = InfinniUI.DateUtils.dateToTimestampTime( value );
        }

        return _value;
    }

} );

dateTimePickerStrategy[ 'TimePicker' ] = dateTimePickerModeTimePicker;

InfinniUI.dateTimePickerModeTimePicker = dateTimePickerModeTimePicker;
