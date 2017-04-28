/**
 * @constructor
 * @augments ContainerBuilder
 */
function CellBuilder() {
    _.superClass( CellBuilder, this );
}

_.inherit( CellBuilder, ContainerBuilder );

_.extend( CellBuilder.prototype, {

    createElement: function( params ) {
        return new Cell( params.parent );
    },

    /**
     * @param {Object} params
     * @param {CellBuilder} params.element
     * @param {Object} params.metadata
     */
    applyMetadata: function( params ) {
        var metadata = params.metadata;
        var element = params.element;

        ContainerBuilder.prototype.applyMetadata.call( this, params );

        element.setColumnSpan( metadata.ColumnSpan );
    }

} );

InfinniUI.CellBuilder = CellBuilder;
