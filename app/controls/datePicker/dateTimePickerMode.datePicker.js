console.assert( dateTimePickerModeDate, 'dateTimePickerModeDate is undefined' );

var dateTimePickerModeDatePicker = _.extend( {}, dateTimePickerModeDate, {

    convertValue: function( value ) {
        var _value = null;
        if ( value && value.constructor === Date ) {
            _value = InfinniUI.DateUtils.dateToTimestamp( value );
        }

        return _value;
    }
} );

dateTimePickerStrategy[ 'DatePicker' ] = dateTimePickerModeDatePicker;
