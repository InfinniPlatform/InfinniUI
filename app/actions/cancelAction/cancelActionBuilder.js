function CancelActionBuilder() {
}

_.extend( CancelActionBuilder.prototype, baseActionBuilderMixin, {

    build: function( context, args ) {
        var action = new CancelAction( args.parentView );

        this.applyBaseActionMetadata( action, args );

        return action;
    }

} );

window.InfinniUI.CancelActionBuilder = CancelActionBuilder;
