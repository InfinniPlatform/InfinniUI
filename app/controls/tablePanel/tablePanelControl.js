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

    createControlModel: function() {
        return new TablePanelModel();
    },

    createControlView: function( model ) {
        return new TablePanelView( { model: model } );
    }

} );

InfinniUI.TablePanelControl = TablePanelControl;
