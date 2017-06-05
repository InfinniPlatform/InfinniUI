/**
 * @constructor
 * @augments ContainerBuilder
 */
function MenuBarBuilder() {
    _.superClass( MenuBarBuilder, this );
}

InfinniUI.MenuBarBuilder = MenuBarBuilder;

_.inherit( MenuBarBuilder, ContainerBuilder );

_.extend( MenuBarBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {MenuBar}
     */
    createElement: function( params ) {
        return new MenuBar( params.parent );
    }

} );
