var TooltipView = ControlView.extend( {

    render: function() {
        this.prerenderingActions();
        this.renderContent();
        this.trigger( 'render' );
        this.postrenderingActions();
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    initHandlersForProperties: function(  ) {
        ControlView.prototype.initHandlersForProperties.apply( this, Array.prototype.slice.call( arguments ) );

        this.listenTo( this.model, 'change:content', this.updateContent );
    },

    updateContent: function(  ) {
        this.renderContent();
    },

    /**
     * @protected
     */
    renderContent: function() {
        var model = this.model;
        var content = model.get( 'content' );

        this.$el.html( content.render() );
    }

} );

InfinniUI.TooltipView = TooltipView;
