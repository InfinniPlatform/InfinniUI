/**
 * @constructor
 * @augments ContainerBuilder
 */
function GridPanelBuilder() {
    _.superClass( GridPanelBuilder, this );
}

InfinniUI.GridPanelBuilder = GridPanelBuilder;

_.inherit( GridPanelBuilder, ContainerBuilder );

_.extend( GridPanelBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {GridPanel}
     */
    createElement: function( params ) {
        return new GridPanel( params.parent );
    },

    /**
     * @param {Object} params
     * @param {TablePanel} params.element
     * @param {Object} params.metadata
     */
    applyMetadata: function( params ) {
        ContainerBuilder.prototype.applyMetadata.call( this, params );
    }

} );
