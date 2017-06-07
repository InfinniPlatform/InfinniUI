/**
 * @augments ElementBuilder
 * @constructor
 */
function DataGridRowBuilder() {
    _.superClass( DataGridRowBuilder, this );
}

InfinniUI.DataGridRowBuilder = DataGridRowBuilder;

_.inherit( DataGridRowBuilder, ElementBuilder );

_.extend( DataGridRowBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {DataGridRow}
     */
    createElement: function( params ) {
        return new DataGridRow( params.parent );
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );
    }

} );
