/**
 *
 * @param parent
 * @constructor
 */
function DatePicker( parent ) {
    _.superClass( DatePicker, this, parent );

    this.setMode( 'DatePicker' );
    this.setTimeZone();
}

InfinniUI.DatePicker = DatePicker;

_.inherit( DatePicker, DateTimePicker );

/**
 *
 */
DatePicker.prototype.setTimeZone = function() {
    DateTimePicker.prototype.setTimeZone.call( this, 0 );
};

/**
 *
 * @param parent
 * @returns {DatePickerControl}
 */
DatePicker.prototype.createControl = function( parent ) {
    return new DatePickerControl( parent );
};

/**
 *
 * @param value
 * @returns {*}
 */
DatePicker.prototype.convertValue = function( value ) {
    var _value = null;

    if( typeof value === 'undefined' || value === null || !value.toString().length ) {
        _value = null;
    } else {
        _value = InfinniUI.DateUtils.dateToTimestamp( value );
    }

    return _value;
};
