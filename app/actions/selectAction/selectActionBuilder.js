function SelectActionBuilder() {
}

_.extend( SelectActionBuilder.prototype, baseActionBuilderMixin, {

    build: function( context, args ) {
        var builder = args.builder;
        var metadata = args.metadata;
        var parentView = args.parentView;
        var action = new SelectAction( parentView );

        this.applyBaseActionMetadata( action, args );

        var linkView = builder.build( metadata[ 'LinkView' ], { parentView: parentView } );

        action.setProperty( 'linkView', linkView );
        action.setProperty( 'sourceSource', metadata.SourceValue.Source );
        action.setProperty( 'sourceProperty', metadata.SourceValue.Property );
        action.setProperty( 'destinationSource', metadata.DestinationValue.Source );
        action.setProperty( 'destinationProperty', metadata.DestinationValue.Property );

        return action;
    }

} );

window.InfinniUI.SelectActionBuilder = SelectActionBuilder;
