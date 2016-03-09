function AddActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView,
            builder = args.builder;

        var action = new AddAction(parentView);

        var linkView = builder.build( metadata['LinkView'],
                                        {
                                            parent: parentView,
                                            parentView: parentView,
                                            basePathOfProperty: args.basePathOfProperty
                                        });

        action.setProperty('linkView', linkView);
		action.setProperty('sourceSource', metadata.SourceValue.Source);
        action.setProperty('destinationSource', metadata.DestinationValue.Source);

        var destinationProperty = (args.basePathOfProperty != null) ?
            args.basePathOfProperty.resolveProperty( metadata.DestinationValue.Property ) :
            metadata.DestinationValue.Property;

        action.setProperty('destinationProperty', destinationProperty || "");

        return action;
    }
}