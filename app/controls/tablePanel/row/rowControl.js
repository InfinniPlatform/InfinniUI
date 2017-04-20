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

_.extend( RowControl.prototype,
    /** @lends RowControl.prototype */
    {
        createControlModel: function() {
            return new RowModel();
        },

        createControlView: function( model ) {
            return new RowView( { model: model } );
        }
    }
);

