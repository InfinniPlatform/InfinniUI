/**
 *
 * @constructor
 * @augments Element
 * @mixes editorBaseMixin
 * @mixes labelTextElementMixin
 */
function PasswordBox( parent ) {
    _.superClass( PasswordBox, this, parent );
    this.initialize_editorBase();
}

InfinniUI.PasswordBox = PasswordBox;

_.inherit( PasswordBox, Element );

_.extend( PasswordBox.prototype, {

    /**
     *
     * @param value
     */
    setAutocomplete: function( value ) {
        if( typeof value === 'undefined' || value === null ) {
            return;
        }
        this.control.set( 'autocomplete', !!value );
    },

    /**
     * @returns {*}
     */
    getAutocomplete: function() {
        return this.control.get( 'autocomplete' );
    },

    /**
     *
     * @returns {PasswordBoxControl}
     */
    createControl: function() {
        return new PasswordBoxControl();
    },

    /**
     * @returns {*}
     */
    getRawValue: function() {
        return this.control.get( 'rawValue' );
    }

}, editorBaseMixin, labelTextElementMixin );
