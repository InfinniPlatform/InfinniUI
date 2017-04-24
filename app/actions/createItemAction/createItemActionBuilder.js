function CreateItemActionBuilder() {
}

_.extend( CreateItemActionBuilder.prototype, baseActionBuilderMixin, {

    build: function( context, args ) {
        var action = new CreateItemAction( args.parentView );
        var metadata = args.metadata;

        this.applyBaseActionMetadata( action, args );

        if( metadata.DestinationValue && metadata.DestinationValue.Source ) {
            action.setProperty( 'destinationSource', metadata.DestinationValue.Source );
            action.setProperty( 'destinationDataSource', context.dataSources[ metadata.DestinationValue.Source ] );

            var destinationProperty = ( args.basePathOfProperty !== null && typeof args.basePathOfProperty !== 'undefined' ) ?
                args.basePathOfProperty.resolveProperty( metadata.DestinationValue.Property ) :
                metadata.DestinationValue.Property;

            action.setProperty( 'destinationProperty', destinationProperty );
        }

        return action;
    }

} );

InfinniUI.CreateItemActionBuilder = CreateItemActionBuilder;
