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

_.extend( ToolBarControl.prototype, /** @lends ToolBarControl.prototype */ {

    createControlModel: function() {
        return new ToolBarModel();
    },

    createControlView: function( model ) {
        return new ToolBarView( { model: model } );
    }
} );

