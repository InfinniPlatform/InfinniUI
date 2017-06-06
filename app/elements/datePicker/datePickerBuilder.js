/**
 *
 * @constructor
 */
function DatePickerBuilder() {
    _.superClass( DatePickerBuilder, this );
}

InfinniUI.DatePickerBuilder = DatePickerBuilder;

_.inherit( DatePickerBuilder, DateTimePickerBuilder );

/**
 *
 * @param params
 * @returns {DatePicker}
 */
DatePickerBuilder.prototype.createElement = function( params ) {
    return new DatePicker( params.parent );
};

/**
 *
 * @param params
 */
DatePickerBuilder.prototype.applyDefaultMetadata = function( params ) {

    params.metadata = _.extend( {}, params.metadata, {
        Mode: 'DatePicker',
        TimeZone: 0
    } );

    _.defaults( params.metadata, {
        DisplayFormat: '${:d}',
        EditMask: { DateTimeEditMask: { Mask: 'd' } }
    } );

};
