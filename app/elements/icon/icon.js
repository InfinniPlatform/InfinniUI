function Icon( parent ) {
    _.superClass( Icon, this, parent );
}

window.InfinniUI.Icon = Icon;

_.inherit( Icon, Element );

_.extend( Icon.prototype, {

    createControl: function() {
        return new IconControl();
    },

    setValue: function( value ) {
        this.control.set( 'value', value );
    },

    getValue: function() {
        return this.control.get( 'value' );
    },

    getSize: function() {
        return this.control.get( 'size' );
    },

    setSize: function( size ) {
        if( typeof size == 'string' ) {
            this.control.set( 'size', size );
        }
    },

    onValueChanged: function() {
    }

} );
