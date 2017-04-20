var ViewPanelView = ControlView.extend( {
    className: 'pl-view-panel',

    initialize: function() {
        ControlView.prototype.initialize.apply( this );
        this.listenTo( this.model, 'change:layout', this.onChangeLayoutHandler );
    },

    onChangeLayoutHandler: function( model, layout ) {
        this.$el.empty();
        if( layout ) {
            this.$el.append( layout.render() );
        }
    },

    render: function() {
        this.prerenderingActions();

        var layout = this.model.get( 'layout' );

        if( layout ) {
            this.$el.append( layout.render() );
        }

        this.updateProperties();
        this.trigger( 'render' );

        this.postrenderingActions( false );
        //devblockstart
        window.InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    }
} );