/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function ScrollPanelControl( parent ) {
    _.superClass( ScrollPanelControl, this, parent );
}

_.inherit( ScrollPanelControl, ContainerControl );

_.extend( ScrollPanelControl.prototype, {

    createControlModel: function() {
        return new ScrollPanelModel();
    },

    createControlView: function( model ) {
        return new ScrollPanelView( { model: model } );
    }

} );

InfinniUI.ScrollPanelControl = ScrollPanelControl;
