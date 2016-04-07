function SelectActionBuilder() {
    this.build = function (context, args) {
        var builder = args.builder,
            metadata = args.metadata,
            parentView = args.parentView;
        var action = new SelectAction(parentView);

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('sourceSource', metadata.SourceValue.Source);
        action.setProperty('sourceProperty', metadata.SourceValue.Property);
        action.setProperty('destinationSource', metadata.DestinationValue.Source);
        action.setProperty('destinationProperty', metadata.DestinationValue.Property);

        return action;
    }
}

