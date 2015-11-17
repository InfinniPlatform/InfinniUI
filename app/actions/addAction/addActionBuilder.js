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

            action.setProperty('DestinationProperty', metadata.DestinationValue.Property);
            action.setProperty('SourceSource', metadata.SourceValue.Source);
        }

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('DestinationSource', metadata.DestinationValue.Source);

        return action;
    }
}