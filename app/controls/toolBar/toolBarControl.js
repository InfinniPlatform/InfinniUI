/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function ToolBarControl( parent ) {
    _.superClass( ToolBarControl, this, parent );
}

_.inherit( ToolBarControl, ContainerControl );

_.extend( ToolBarControl.prototype, {

    /**
     * @returns {ToolBarModel}
     */
    createControlModel: function() {
        return new ToolBarModel();
    },

    /**
     * @returns {ToolBarView}
     * @param model
     */
    createControlView: function( model ) {
        return new ToolBarView( { model: model } );
    }

} );

InfinniUI.ToolBarControl = ToolBarControl;
