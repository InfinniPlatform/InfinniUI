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

    createControlModel: function() {
        return new GridPanelModel();
    },

    createControlView: function( model ) {
        return new GridPanelView( { model: model } );
    }

} );

InfinniUI.GridPanelControl = GridPanelControl;
