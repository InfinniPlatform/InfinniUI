/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function MenuBarControl( parent ) {
    _.superClass( MenuBarControl, this, parent );
}

_.inherit( MenuBarControl, ContainerControl );

_.extend( MenuBarControl.prototype, {

    /**
     * @returns {MenuBarModel}
     */
    createControlModel: function() {
        return new MenuBarModel();
    },

    /**
     * @returns {MenuBarView}
     * @param model
     */
    createControlView: function( model ) {
        return new MenuBarView( { model: model } );
    }

} );

InfinniUI.MenuBarControl = MenuBarControl;
