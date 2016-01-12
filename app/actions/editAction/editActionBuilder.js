function EditActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView,
            builder = args.builder,
            destinationProperty;

        var action = new EditAction(parentView);

        var linkView = builder.build(metadata['LinkView'], {parent: args.parent, parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('destinationSource', metadata.DestinationValue.Source);
        action.setProperty('sourceSource', metadata.SourceValue.Source);

        destinationProperty = args.basePathOfProperty.resolveProperty(metadata.DestinationValue.Property);
        action.setProperty('destinationProperty', destinationProperty);

        return action;
    }
}