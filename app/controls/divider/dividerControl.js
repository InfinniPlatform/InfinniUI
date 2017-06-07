/**
 *
 * @param parent
 * @constructor
 * @arguments Control
 */
function DividerControl( parent ) {
    _.superClass( DividerControl, this, parent );
}

_.inherit( DividerControl, Control );

_.extend( DividerControl.prototype, {

    /**
     *
     * @returns {DividerModel}
     */
    createControlModel: function() {
        return new DividerModel();
    },

    /**
     *
     * @param model
     * @returns {DividerView}
     */
    createControlView: function( model ) {
        return new DividerView( { model: model } );
    }

} );

InfinniUI.DividerControl = DividerControl;
