console.assert( dateTimePickerModeDate, 'dateTimePickerModeDate is undefined' );

/**
 *
 * @constructor
 */
var dateTimePickerModeDatePicker = _.extend( {}, dateTimePickerModeDate, {

    /**
     *
     * @param value
     * @returns {*}
     */
    convertValue: function( value ) {
        var _value = null;
        if ( value && value.constructor === Date ) {
            _value = InfinniUI.DateUtils.dateToTimestamp( value );
        }

        return _value;
    }

} );

dateTimePickerStrategy[ 'DatePicker' ] = dateTimePickerModeDatePicker;

InfinniUI.dateTimePickerModeDatePicker = dateTimePickerModeDatePicker;
