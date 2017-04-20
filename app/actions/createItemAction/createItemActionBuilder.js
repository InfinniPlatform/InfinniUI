function CreateItemActionBuilder() {
}

_.extend( CreateItemActionBuilder.prototype,
    BaseActionBuilderMixin,
    {
        build: function( context, args ) {
            var action = new CreateItemAction( args.parentView );
            var metadata = args.metadata;

            this.applyBaseActionMetadata( action, args );

            if( metadata.DestinationValue && metadata.DestinationValue.Source ) {
                action.setProperty( 'destinationSource', metadata.DestinationValue.Source );
                action.setProperty( 'destinationDataSource', context.dataSources[ metadata.DestinationValue.Source ] );

                var destinationProperty = ( args.basePathOfProperty !== null ) ?
                    args.basePathOfProperty.resolveProperty( metadata.DestinationValue.Property ) :
                    metadata.DestinationValue.Property;

                action.setProperty( 'destinationProperty', destinationProperty );
            }

            return action;
        }
    }
);

window.InfinniUI.CreateItemActionBuilder = CreateItemActionBuilder;
