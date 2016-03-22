function DeleteActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView,
            sourceName = metadata.DestinationValue.Source,
            propertyName = metadata.DestinationValue.Property || '$';

        var action = new DeleteAction(parentView);

        var accept = (metadata['Accept'] !== false),
            dataSource = parentView.getContext().dataSources[sourceName],
            destinationProperty = (args.basePathOfProperty != null) ?
                                    args.basePathOfProperty.resolveProperty( propertyName ) :
                                    propertyName;

        action.setProperty('accept', accept);
        action.setProperty('destinationSource', dataSource);
        action.setProperty('destinationProperty', destinationProperty);

        return action;
    }
}