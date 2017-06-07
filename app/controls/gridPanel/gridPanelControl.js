/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function GridPanelControl( parent ) {
    _.superClass( GridPanelControl, this, parent );
}

_.inherit( GridPanelControl, ContainerControl );

_.extend( GridPanelControl.prototype, {

    /**
     * @returns {GridPanelModel}
     */
    createControlModel: function() {
        return new GridPanelModel();
    },

    /**
     * @returns {GridPanelView}
     * @param model
     */
    createControlView: function( model ) {
        return new GridPanelView( { model: model } );
    }

} );

InfinniUI.GridPanelControl = GridPanelControl;
