var ExtensionPanelView = ContainerView.extend( {

    className: 'pl-extension-panel',

    initialize: function() {
        ContainerView.prototype.initialize.apply( this );
        this.extensionObject = null;
    },

    render: function() {
        this.prerenderingActions();

        if ( !this.extensionObject ) {
            this.initExtensionObject();
        }

        this.extensionObject.render();

        this.updateProperties();
        this.trigger( 'render' );

        this.postrenderingActions();
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    updateGrouping: function() {

    },

    initExtensionObject: function() {
        var extensionName = this.model.get( 'extensionName' );
        var context = this.model.get( 'context' );
        var itemTemplate = this.model.get( 'itemTemplate' );
        var parameters = this.model.get( 'parameters' );
        var items = this.model.get( 'items' );
        var builder = this.model.get( 'builder' );
        var initializer = InfinniUI.extensionPanels.getByName( extensionName ) || window[ extensionName ];

        if( _.isFunction( initializer ) ) {
            this.extensionObject = new initializer( context, { $el: this.$el, parameters: parameters, itemTemplate: itemTemplate, items: items, builder: builder } );
        } else {
            throw new Error( 'invalid extensionPanel name' );
        }
    }

} );

InfinniUI.ExtensionPanelView = ExtensionPanelView;
