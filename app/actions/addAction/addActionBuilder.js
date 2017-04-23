function AddActionBuilder() {
}

_.extend( AddActionBuilder.prototype, baseActionBuilderMixin, baseEditActionBuilderMixin, {

    build: function( context, args ) {
        var action = new AddAction( args.parentView );

        this.applyBaseActionMetadata( action, args );
        this.applyBaseEditActionMetadata( action, args );

        return action;
    }

} );

window.InfinniUI.AddActionBuilder = AddActionBuilder;
