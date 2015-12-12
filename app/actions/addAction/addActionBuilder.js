function AddActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView,
            builder = args.builder;
        var action;

        // validation???

        if( _.isEmpty(metadata.DestinationValue.Property) ){
            action = new AddAction(parentView);
        } else {
            action = new AddItemAction(parentView);

            action.setProperty('destinationProperty', metadata.DestinationValue.Property);
        }

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('destinationSource', metadata.DestinationValue.Source);
		action.setProperty('sourceSource', metadata.SourceValue.Source);

        return action;
    }
}