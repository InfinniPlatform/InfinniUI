/**
 *
 * @param viewMode
 * @constructor
 * @augments ContainerControl
 */
function StackPanelControl( viewMode ) {
    _.superClass( StackPanelControl, this, viewMode );
}

_.inherit( StackPanelControl, ContainerControl );

_.extend( StackPanelControl.prototype, {

    /**
     * @returns {StackPanelModel}
     */
    createControlModel: function() {
        return new StackPanelModel();
    },

    /**
     * @returns {StackPanelView}
     * @param model
     * @param viewMode
     */
    createControlView: function( model, viewMode ) {
        var view = new StackPanelView( { model: model } );

        view.viewMode = viewMode;

        return view;
    }

} );

InfinniUI.StackPanelControl = StackPanelControl;
