function AddActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView,
            builder = args.builder;

        var action = new AddAction(parentView);

        var suspended = {};
        suspended[metadata.SourceValue.Source] = 'AddAction';

        var linkView = builder.build(metadata['LinkView'], {
            parent: args.parent,
            parentView: parentView,
            basePathOfProperty: args.basePathOfProperty,
            suspended: suspended
        });

        action.setProperty('linkView', linkView);
		action.setProperty('sourceSource', metadata.SourceValue.Source);
        action.setProperty('destinationSource', metadata.DestinationValue.Source);

        var destinationProperty = (args.basePathOfProperty != null) ?
            args.basePathOfProperty.resolveProperty( metadata.DestinationValue.Property ) :
            metadata.DestinationValue.Property;

        action.setProperty('destinationProperty', destinationProperty);

        return action;
    }
}