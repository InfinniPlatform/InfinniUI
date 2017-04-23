function SaveActionBuilder() {
}

_.extend( SaveActionBuilder.prototype, baseActionBuilderMixin, baseFallibleActionBuilderMixin, {

    build: function( context, args ) {
        var parentView = args.parentView;
        var dataSource = parentView.getContext().dataSources[ args.metadata.DestinationValue.Source ];
        var action = new SaveAction( parentView );

        this.applyBaseActionMetadata( action, args );
        this.applyBaseFallibleActionMetadata( action, args );

        action.setProperty( 'dataSource', dataSource );
        action.setProperty( 'canClose', args.metadata.CanClose );

        return action;
    }

} );

window.InfinniUI.SaveActionBuilder = SaveActionBuilder;
