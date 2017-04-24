function OpenActionBuilder() {
}


_.extend( OpenActionBuilder.prototype, baseActionBuilderMixin, {

    build: function( context, args ) {
        var action = new OpenAction( args.parentView );

        this.applyBaseActionMetadata( action, args );

        var linkView = args.builder.build( args.metadata.LinkView, {
            parent: args.parent,
            parentView: args.parentView,
            basePathOfProperty: args.basePathOfProperty
        } );
        action.setProperty( 'linkView', linkView );

        return action;
    }

} );

InfinniUI.OpenActionBuilder = OpenActionBuilder;
