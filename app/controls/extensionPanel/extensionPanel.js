var ExtensionPanelControl = function() {
    _.superClass( ExtensionPanelControl, this );
};

_.inherit( ExtensionPanelControl, ContainerControl );

_.extend( ExtensionPanelControl.prototype, {

    createControlModel: function() {
        return new ExtensionPanelModel();
    },

    createControlView: function( model ) {
        return new ExtensionPanelView( { model: model } );
    }

} );

InfinniUI.ExtensionPanelControl = ExtensionPanelControl;
