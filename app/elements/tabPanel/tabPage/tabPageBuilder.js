/**
 * @constructor
 * @augments ContainerBuilder
 */
function TabPageBuilder() {
    _.superClass( TabPageBuilder, this );
}

_.inherit( TabPageBuilder, ContainerBuilder );

_.extend( TabPageBuilder.prototype, /** @lends TabPageBuilder.prototype*/ {

    createElement: function( params ) {
        return new TabPage( params.parent );
    },

    /**
     * @param {Object} params
     * @param {Panel} params.element
     * @param {Object} params.metadata
     */
    applyMetadata: function( params ) {
        var metadata = params.metadata;
        var element = params.element;
        var data = ContainerBuilder.prototype.applyMetadata.call( this, params );

        element.setIcon( metadata.Icon );
        element.setCanClose( metadata.CanClose );

        this.initScriptHandlers( params );

        return data;
    },

    /**
     * @protected
     * @param params
     */
    initScriptHandlers: function( params ) {
        var metadata = params.metadata;
        var element = params.element;
        var executorBuilderParams = {
            parentView: params.parentView,
            parent: element,
            basePathOfProperty: params.basePathOfProperty
        };

        if ( metadata.OnClosing ) {
            var onClosingExecutor = Executor( metadata.OnClosing, params.builder, executorBuilderParams );
            element.onClosing( onClosingExecutor.bind( null, {} ) );
        }

        if ( metadata.OnClosed ) {
            var onClosedExecutor = Executor( metadata.OnClosed, params.builder, executorBuilderParams );
            element.onClosed( onClosedExecutor.bind( null, {} ) );
        }
    }

} );

InfinniUI.TabPageBuilder = TabPageBuilder;
