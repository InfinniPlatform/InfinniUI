function TimePicker( parent ) {
    _.superClass( TimePicker, this, parent );

    this.setMode( 'TimePicker' );
    this.setTimeZone();
}

InfinniUI.TimePicker = TimePicker;

_.inherit( TimePicker, DateTimePicker );


TimePicker.prototype.createControl = function( parent ) {
    return new TimePickerControl( parent );
};

TimePicker.prototype.setTimeZone = function() {
    DateTimePicker.prototype.setTimeZone.call( this, 0 );
};

TimePicker.prototype.convertValue = function( value ) {
    var _value = null;

    if( typeof value === 'undefined' || value === null || !value.toString().length ) {
        _value = null;
    } else {
        _value = InfinniUI.DateUtils.dateToTimestampTime( value );
    }

    return _value;
};
