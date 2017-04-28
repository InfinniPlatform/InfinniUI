/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function TablePanelControl( parent ) {
    _.superClass( TablePanelControl, this, parent );
}

_.inherit( TablePanelControl, ContainerControl );

_.extend( TablePanelControl.prototype, {

    /**
     * @returns {TablePanelModel}
     */
    createControlModel: function() {
        return new TablePanelModel();
    },

    /**
     * @returns {TablePanelView}
     * @param model
     */
    createControlView: function( model ) {
        return new TablePanelView( { model: model } );
    }

} );

InfinniUI.TablePanelControl = TablePanelControl;
