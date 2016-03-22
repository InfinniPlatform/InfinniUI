function EditActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView,
            builder = args.builder;

        var destinationProperty = (args.basePathOfProperty != null) ?
            args.basePathOfProperty.resolveProperty( metadata.DestinationValue.Property ) :
            metadata.DestinationValue.Property;

        var action = new EditAction(parentView);

        var suspended = {};
        suspended[metadata.DestinationValue.Source] = 'EditAction';

        var linkView = builder.build(metadata['LinkView'], {
            parent: args.parent,
            parentView: parentView,
            basePathOfProperty: args.basePathOfProperty,
            suspended: suspended
        });
        action.setProperty('linkView', linkView);

        action.setProperty('sourceSource', metadata.SourceValue.Source);
        action.setProperty('destinationSource', metadata.DestinationValue.Source);

        action.setProperty('destinationProperty', destinationProperty || '$');

        return action;
    }
}