function EditActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView,
            builder = args.builder;
        var action;

        if( _.isEmpty(metadata.DestinationValue.Property)  || InfinniUI.Metadata.isPredefinedIdentifierProperty(metadata.DestinationValue.Property) ){
            action = new EditAction(parentView);
        } else {
            action = new EditItemAction(parentView);
        }

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('destinationSource', metadata.DestinationValue.Source);
        action.setProperty('sourceSource', metadata.SourceValue.Source);

        if( !_.isEmpty(metadata.DestinationValue.Property) ){
            action.setProperty('destinationProperty', metadata.DestinationValue.Property);
            action.setProperty('index', _.last(args.basePathOfProperty.indexesInParentLists));
        }

        return action;
    }
}