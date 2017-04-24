function TimePickerBuilder() {
    _.superClass( TimePickerBuilder, this );
}

InfinniUI.TimePickerBuilder = TimePickerBuilder;

_.inherit( TimePickerBuilder, DateTimePickerBuilder );

TimePickerBuilder.prototype.createElement = function( params ) {
    return new TimePicker( params.parent );
};

TimePickerBuilder.prototype.applyDefaultMetadata = function( params ) {

    params.metadata = _.extend( {}, params.metadata, {
        Mode: 'TimePicker',
        TimeZone: 0
    } );

    _.defaults( params.metadata, {
        DisplayFormat: '${:T}',
        EditMask: {
            DateTimeEditMask: {
                Mask: 'T'
            }
        }
    } );

};

TimePickerBuilder.prototype.applyMinValue = function( element, minValue ) {
    var date = InfinniUI.DateUtils.parseTimeISO8601toDate( minValue, 0 );

    if( typeof date !== 'undefined' ) {
        element.setMinValue( date );
    }
};

TimePickerBuilder.prototype.applyMaxValue = function( element, maxValue ) {
    var date = InfinniUI.DateUtils.parseTimeISO8601toDate( maxValue, 0 );

    if( typeof date !== 'undefined' ) {
        element.setMaxValue( date );
    }
};
