/**
 * @augments ListEditorBase
 * @param parent
 * @constructor
 * @mixes labelTextElementMixin
 */
function ComboBox( parent ) {
    _.superClass( ComboBox, this, parent );
}

InfinniUI.ComboBox = ComboBox;

_.inherit( ComboBox, ListEditorBase );

_.extend( ComboBox.prototype, labelTextElementMixin );

/**
 *
 * @returns {ComboBoxControl}
 */
ComboBox.prototype.createControl = function() {
    return new ComboBoxControl();
};

/**
 *
 * @param value
 */
ComboBox.prototype.setValueTemplate = function( value ) {
    this.control.set( 'valueTemplate', value );
};

/**
 * @returns {*}
 */
ComboBox.prototype.getValueTemplate = function() {
    return this.control.get( 'valueTemplate' );
};

/**
 * @returns {*}
 */
ComboBox.prototype.getAutocomplete = function() {
    return this.control.get( 'autocomplete' );
};

/**
 *
 * @param value
 */
ComboBox.prototype.setAutocomplete = function( value ) {
    if ( typeof value === 'boolean' ) {
        this.control.set( 'autocomplete', value );
    }
};

/**
 *
 * @param value
 */
ComboBox.prototype.setShowClear = function( value ) {
    if ( typeof value === 'boolean' ) {
        this.control.set( 'showClear', value );
    }
};

/**
 * @returns {*}
 */
ComboBox.prototype.getShowClear = function() {
    return this.control.get( 'showClear' );
};

/**
 * @returns {*}
 */
ComboBox.prototype.getAutocompleteValue = function() {
    return this.control.get( 'autocompleteValue' );
};

/**
 *
 * @param value
 */
ComboBox.prototype.setAutocompleteValue = function( value ) {
    this.control.set( 'autocompleteValue', value );
};

/**
 *
 * @param value
 */
ComboBox.prototype.setNoItemsMessage = function( value ) {
    this.control.setNoItemsMessage( value );
};
