function SelectActionBuilder() {
    this.build = function (context, args) {
        var builder = args.builder,
            metadata = args.metadata,
            parentView = args.parentView;
        var action = new SelectAction(parentView);

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('srcDataSourceName', metadata.SourceValue.Source);
        action.setProperty('srcPropertyName', metadata.SourceValue.Property);
        action.setProperty('dstDataSourceName', metadata.DestinationValue.Source);
        action.setProperty('dstPropertyName', metadata.DestinationValue.Property);

        return action;
    }
}

