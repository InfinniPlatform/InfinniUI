/**
 * @constructor
 * @augments ContainerBuilder
 */
function TablePanelBuilder() {
    _.superClass( TablePanelBuilder, this );
}

InfinniUI.TablePanelBuilder = TablePanelBuilder;

_.inherit( TablePanelBuilder, ContainerBuilder );

_.extend( TablePanelBuilder.prototype, {

    createElement: function( params ) {
        return new TablePanel( params.parent );
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
