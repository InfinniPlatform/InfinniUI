/**
 *
 * @param parent
 * @constructor
 */
function Icon( parent ) {
    _.superClass( Icon, this, parent );
}

InfinniUI.Icon = Icon;

_.inherit( Icon, Element );

_.extend( Icon.prototype, {

    /**
     *
     * @returns {IconControl}
     */
    createControl: function() {
        return new IconControl();
    },

    /**
     *
     * @param value
     */
    setValue: function( value ) {
        this.control.set( 'value', value );
    },

    /**
     * @returns {*}
     */
    getValue: function() {
        return this.control.get( 'value' );
    },

    /**
     * @returns {*}
     */
    getSize: function() {
        return this.control.get( 'size' );
    },

    /**
     *
     * @param size
     */
    setSize: function( size ) {
        if( typeof size == 'string' ) {
            this.control.set( 'size', size );
        }
    },

    /**
     *
     */
    onValueChanged: function() {
    }

} );
