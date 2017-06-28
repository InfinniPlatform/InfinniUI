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

/**
 *
 * @param parent
 * @returns {DateTimePickerControl}
 */
DateTimePicker.prototype.createControl = function( parent ) {
    return new DateTimePickerControl( parent );
};

/**
 * @returns {*}
 */
DateTimePicker.prototype.getMinValue = function() {
    return this.control.get( 'minValue' );
};

/**
 *
 * @param value
 */
DateTimePicker.prototype.setMinValue = function( value ) {
    this.control.set( 'minValue', value );
};

/**
 * @returns {*}
 */
DateTimePicker.prototype.getMaxValue = function() {
    return this.control.get( 'maxValue' );
};

/**
 *
 * @param value
 */
DateTimePicker.prototype.setMaxValue = function( value ) {
    this.control.set( 'maxValue', value );
};

/**
 * @returns {*}
 */
DateTimePicker.prototype.getMode = function() {
    return this.control.get( 'mode' );
};

/**
 *
 * @param value
 */
DateTimePicker.prototype.setMode = function( value ) {
    this.control.set( 'mode', value );
};

/**
 * @returns {*}
 */
DateTimePicker.prototype.getTimeZone = function() {
    return this.control.get( 'timeZone' );
};

/**
 *
 * @param value
 */
DateTimePicker.prototype.setTimeZone = function( value ) {
    if( typeof value === 'number' ) {
        this.control.set( 'timeZone', value );
    }
};

/**
 *
 * @param value
 */
DateTimePicker.prototype.setDateFormat = function( value ) {
    this.control.set( 'format', value );
};


