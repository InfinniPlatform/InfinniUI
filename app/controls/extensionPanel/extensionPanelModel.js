var ExtensionPanelModel = ContainerModel.extend( {

    defaults: _.defaults( {
        extensionName: null,
        context: null
    }, ContainerModel.prototype.defaults ),

    initialize: function() {
        ContainerModel.prototype.initialize.apply( this );
    }

} );

InfinniUI.ExtensionPanelModel = ExtensionPanelModel;
