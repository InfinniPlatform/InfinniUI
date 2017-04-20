function ContextMenuControl() {
    _.superClass( ContextMenuControl, this );
}

_.inherit( ContextMenuControl, ContainerControl );

_.extend( ContextMenuControl.prototype, /** @lends ContextMenuControl.prototype */ {

    createControlModel: function() {
        return new ContextMenuModel();
    },

    createControlView: function( model ) {
        return new ContextMenuView( { model: model } );
    }

} );

