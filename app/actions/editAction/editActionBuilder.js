function EditActionBuilder() {
}

_.extend( EditActionBuilder.prototype, baseActionBuilderMixin, baseEditActionBuilderMixin, {

    build: function( context, args ) {
        var action = new EditAction( args.parentView );

        this.applyBaseActionMetadata( action, args );
        this.applyBaseEditActionMetadata( action, args );

        return action;
    }

} );

InfinniUI.EditActionBuilder = EditActionBuilder;
