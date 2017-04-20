/**
 * @constructor
 * @augments ContainerBuilder
 */
function TabPanelBuilder() {
    _.superClass( TabPanelBuilder, this );
}

window.InfinniUI.TabPanelBuilder = TabPanelBuilder;

_.inherit( TabPanelBuilder, ContainerBuilder );

_.extend( TabPanelBuilder.prototype, /** @lends TabPanelBuilder.prototype*/ {

    createElement: function( params ) {
        return new TabPanel( params.parent );
    },

    /**
     * @param {Object} params
     * @param {Panel} params.element
     * @param {Object} params.metadata
     */
    applyMetadata: function( params ) {
        var
            metadata = params.metadata,
            element = params.element;

        var data = ContainerBuilder.prototype.applyMetadata.call( this, params );

        element.setHeaderLocation( metadata.HeaderLocation );
        element.setHeaderOrientation( metadata.HeaderOrientation );

        this.initScriptHandlers( params );
        return data;
    },

    initScriptHandlers: function( params ) {
        var
            metadata = params.metadata,
            element = params.element;

        element.onSelectedItemChanged( function( context, args ) {
            var exchange = window.InfinniUI.global.messageBus;
            exchange.send( 'OnChangeLayout', {} );
        } );

        var executorBuilderParams = {
            parentView: params.parentView,
            parent: element,
            basePathOfProperty: params.basePathOfProperty
        };

        if ( metadata.OnSelectedItemChanged ) {
            var onSelectedItemChangedExecutor = Executor( metadata.OnSelectedItemChanged, params.builder, executorBuilderParams );
            element.onSelectedItemChanged( function( context, args ) {
                onSelectedItemChangedExecutor( args );
            } );
        }
    }


} );
