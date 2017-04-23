function AcceptActionBuilder() {
}

_.extend( AcceptActionBuilder.prototype, baseActionBuilderMixin, {

    build: function( context, args ) {
        var action = new AcceptAction( args.parentView );

        this.applyBaseActionMetadata( action, args );

        return action;
    }

} );

window.InfinniUI.AcceptActionBuilder = AcceptActionBuilder;
