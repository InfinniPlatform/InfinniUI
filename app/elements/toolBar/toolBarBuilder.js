/**
 *
 * @constructor
 * @augments ContainerBuilder
 */
function ToolBarBuilder() {
    _.superClass( ToolBarBuilder, this );
}

InfinniUI.ToolBarBuilder = ToolBarBuilder;

_.inherit( ToolBarBuilder, ContainerBuilder );

_.extend( ToolBarBuilder.prototype, {

    createElement: function( params ) {
        return new ToolBar( params.parent );
    }

} );
