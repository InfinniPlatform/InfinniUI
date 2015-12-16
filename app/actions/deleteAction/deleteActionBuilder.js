function DeleteActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView;
        var action;

        var accept = (metadata['Accept'] !== false);
        var dataSource = parentView.getContext().dataSources[metadata.DestinationValue.Source];


        if( _.isEmpty(metadata.DestinationValue.Property) || InfinniUI.Metadata.isPredefinedIdentifierProperty(metadata.DestinationValue.Property) ){
            action = new DeleteAction(parentView);
        } else {
            action = new DeleteItemAction(parentView);
        }

        action.setProperty('accept', accept);
        action.setProperty('destinationSource', dataSource);

        if( !_.isEmpty(metadata.DestinationValue.Property) ){
            action.setProperty('destinationProperty', metadata.DestinationValue.Property);
            action.setProperty('index', _.last(args.basePathOfProperty.indexesInParentLists));
        }


        return action;
    }
}