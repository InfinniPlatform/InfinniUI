function DataGridRowBuilder() {
    _.superClass( DataGridRowBuilder, this );
}

InfinniUI.DataGridRowBuilder = DataGridRowBuilder;

_.inherit( DataGridRowBuilder, ElementBuilder );

_.extend( DataGridRowBuilder.prototype, {

    createElement: function( params ) {
        return new DataGridRow( params.parent );
    },

    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );
    }

} );
