/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBase
 */
function DateTimePicker( parent ) {
    _.superClass( DateTimePicker, this, parent );
}

InfinniUI.DateTimePicker = DateTimePicker;

_.inherit( DateTimePicker, TextEditorBase );

DateTimePicker.prototype.createControl = function( parent ) {
    return new DateTimePickerControl( parent );
};

DateTimePicker.prototype.getMinValue = function() {
    return this.control.get( 'minValue' );
};

DateTimePicker.prototype.setMinValue = function( value ) {
    this.control.set( 'minValue', value );
};

DateTimePicker.prototype.getMaxValue = function() {
    return this.control.get( 'maxValue' );
};

DateTimePicker.prototype.setMaxValue = function( value ) {
    this.control.set( 'maxValue', value );
};

DateTimePicker.prototype.getMode = function() {
    return this.control.get( 'mode' );
};

DateTimePicker.prototype.setMode = function( value ) {
    this.control.set( 'mode', value );
};

DateTimePicker.prototype.getTimeZone = function() {
    return this.control.get( 'timeZone' );
};

DateTimePicker.prototype.setTimeZone = function( value ) {
    if( _.isNumber( value ) ) {
        this.control.set( 'timeZone', value );
    }
};

DateTimePicker.prototype.setDateFormat = function( value ) {
    this.control.set( 'format', value );
};

DateTimePicker.prototype.validateValue = function( value ) {
    if( value === null || value === '' || typeof value === 'undefined' ) {
        return;
    }

    var minValue = InfinniUI.DateUtils.restoreTimezoneOffset( this.getMinValue(), this.getTimeZone() );
    var maxValue = InfinniUI.DateUtils.restoreTimezoneOffset( this.getMaxValue(), this.getTimeZone() );
    var isValid = InfinniUI.DateUtils.checkRangeDate( value, minValue, maxValue );

    if( !isValid ) {
        return 'Неверное значение';
    }
};


