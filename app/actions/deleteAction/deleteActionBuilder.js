function DeleteActionBuilder() {
}

_.extend( DeleteActionBuilder.prototype,
    BaseActionBuilderMixin,
    BaseFallibleActionBuilderMixin,
    {
        build: function( context, args ) {
            var metadata = args.metadata;
            var parentView = args.parentView;
            var sourceName = metadata.DestinationValue.Source;
            var propertyName = metadata.DestinationValue.Property || '$';
            var action = new DeleteAction( parentView );

            this.applyBaseActionMetadata( action, args );
            this.applyBaseFallibleActionMetadata( action, args );

            var accept = ( metadata[ 'Accept' ] !== false );
            var dataSource = parentView.getContext().dataSources[ sourceName ];
            var destinationProperty = ( args.basePathOfProperty !== null && typeof args.basePathOfProperty !== 'undefined' ) ?
                args.basePathOfProperty.resolveProperty( propertyName ) :
                propertyName;

            action.setProperty( 'accept', accept );
            action.setProperty( 'acceptMessage', metadata.AcceptMessage );
            action.setProperty( 'acceptMessageType', metadata.AcceptMessageType );
            action.setProperty( 'destinationSource', dataSource );
            action.setProperty( 'destinationProperty', destinationProperty );

            return action;
        }
    }
);

window.InfinniUI.DeleteActionBuilder = DeleteActionBuilder;
