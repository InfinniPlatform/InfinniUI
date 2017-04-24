function IconBuilder() {
    _.superClass( ButtonBuilder, this );
}

InfinniUI.IconBuilder = IconBuilder;

_.inherit( IconBuilder, ElementBuilder );

_.extend( IconBuilder.prototype, {

    createElement: function( params ) {
        return new Icon( params.parent );
    },

    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );

        this.initBindingToProperty( params, 'Value' );
        this.initBindingToProperty( params, 'Size' );
    }

} );
