/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function PanelControl( parent ) {
    _.superClass( PanelControl, this, parent );
}

_.inherit( PanelControl, ContainerControl );

_.extend( PanelControl.prototype, {

    /**
     * @returns {PanelModel}
     */
    createControlModel: function() {
        return new PanelModel();
    },

    /**
     * @returns {PanelView}
     * @param model
     */
    createControlView: function( model ) {
        return new PanelView( { model: model } );
    }

} );

InfinniUI.PanelControl = PanelControl;
