/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function RowControl( parent ) {
    _.superClass( RowControl, this, parent );
}

_.inherit( RowControl, ContainerControl );

_.extend( RowControl.prototype, {

    /**
     * @returns {RowModel}
     */
    createControlModel: function() {
        return new RowModel();
    },

    /**
     * @returns {RowView}
     * @param model
     */
    createControlView: function( model ) {
        return new RowView( { model: model } );
    }

} );

InfinniUI.RowControl = RowControl;
