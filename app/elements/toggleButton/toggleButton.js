/**
 * @mixes editorBaseMixin
 * @param parent
 * @constructor
 * @augment Element
 */
function ToggleButton( parent ) {
    _.superClass( ToggleButton, this, parent );
    this.initialize_editorBase();
}

InfinniUI.ToggleButton = ToggleButton;

_.inherit( ToggleButton, Element );

_.extend( ToggleButton.prototype, {

    /**
     *
     * @param parent
     * @returns {ToggleButtonControl}
     */
    createControl: function( parent ) {
        return new ToggleButtonControl( parent );
    },

    /**
     * @returns {*}
     */
    getTextOn: function() {
        return this.control.get( 'textOn' );
    },

    /**
     * @returns {*}
     * @param value
     */
    setTextOn: function( value ) {
        return this.control.set( 'textOn', value ? value : '' );
    },

    /**
     * @returns {*}
     */
    getTextOff: function() {
        return this.control.get( 'textOff' );
    },

    /**
     * @returns {*}
     * @param value
     */
    setTextOff: function( value ) {
        return this.control.set( 'textOff', value ? value : '' );
    }

}, editorBaseMixin );
