/**
 * @constructor
 * @augments ContainerBuilder
 */
function RowBuilder() {
    _.superClass( RowBuilder, this );
}

_.inherit( RowBuilder, ContainerBuilder );

_.extend( RowBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {Row}
     */
    createElement: function( params ) {
        return new Row( params.parent );
    },

    /**
     * @param {Object} params
     * @param {RowBuilder} params.element
     * @param {Object} params.metadata
     */
    applyMetadata: function( params ) {
        ContainerBuilder.prototype.applyMetadata.call( this, params );
    }

} );

InfinniUI.RowBuilder = RowBuilder;
