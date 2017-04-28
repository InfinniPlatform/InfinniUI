/**
 *
 * @constructor
 * @augments Control
 */
function DataGridRowControl() {
    _.superClass( DataGridRowControl, this );
}

_.inherit( DataGridRowControl, Control );

_.extend( DataGridRowControl.prototype, {

    /**
     *
     * @param handler
     */
    onToggle: function( handler ) {
        this.controlView.on( 'toggle', handler );
    },

    /**
     *
     * @returns {DataGridModel}
     */
    createControlModel: function() {
        return new DataGridRowModel();
    },

    /**
     *
     * @param model
     * @returns {DataGridRowView}
     */
    createControlView: function( model ) {
        return new DataGridRowView( { model: model } );
    }

} );

InfinniUI.DataGridRowControl = DataGridRowControl;
