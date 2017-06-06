/**
 * @constructor
 * @arguments ContainerBuilder
 */
function ContextMenuBuilder() {
    _.superClass( ContextMenuBuilder, this );
}

InfinniUI.ContextMenuBuilder = ContextMenuBuilder;

_.inherit( ContextMenuBuilder, ContainerBuilder );

_.extend( ContextMenuBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {ContextMenu}
     */
    createElement: function( params ) {
        return new ContextMenu( params.parent );
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ContainerBuilder.prototype.applyMetadata.call( this, params );
    }

} );
