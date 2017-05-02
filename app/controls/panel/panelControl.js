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

    createControlModel: function() {
        return new PanelModel();
    },

    createControlView: function( model ) {
        return new PanelView( { model: model } );
    }

} );

InfinniUI.PanelControl = PanelControl;
