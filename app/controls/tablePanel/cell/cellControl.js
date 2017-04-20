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

_.extend( CellControl.prototype,
    /** @lends CellControl.prototype */
    {
        createControlModel: function() {
            return new CellModel();
        },

        createControlView: function( model ) {
            return new CellView( { model: model } );
        }
    }
);

