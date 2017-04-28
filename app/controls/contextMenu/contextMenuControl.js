/**
 *
 * @constructor
 */
function ContextMenuControl() {
    _.superClass( ContextMenuControl, this );
}

_.inherit( ContextMenuControl, ContainerControl );

_.extend( ContextMenuControl.prototype, {

    /**
     *
     * @returns {ContextMenuModel}
     */
    createControlModel: function() {
        return new ContextMenuModel();
    },

    /**
     *
     * @param model
     * @returns {ContextMenuView}
     */
    createControlView: function( model ) {
        return new ContextMenuView( { model: model } );
    }

} );

InfinniUI.ContextMenuControl = ContextMenuControl;
