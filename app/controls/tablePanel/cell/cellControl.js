/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function CellControl( parent ) {
    _.superClass( CellControl, this, parent );
}

_.inherit( CellControl, ContainerControl );

_.extend( CellControl.prototype, {

    /**
     * @returns {CellModel}
     */
    createControlModel: function() {
        return new CellModel();
    },

    /**
     * @retuns {CellView}
     * @param model
     */
    createControlView: function( model ) {
        return new CellView( { model: model } );
    }

} );

InfinniUI.CellControl = CellControl;
