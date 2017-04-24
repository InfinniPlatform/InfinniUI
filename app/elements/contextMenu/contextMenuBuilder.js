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

    createElement: function( params ) {
        return new ContextMenu( params.parent );
    },

    applyMetadata: function( params ) {
        ContainerBuilder.prototype.applyMetadata.call( this, params );
    }

} );
