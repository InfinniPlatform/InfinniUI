function SelectActionBuilder() {
    this.build = function (context, args) {
        var builder = args.builder,
            metadata = args.metadata,
            parentView = args.parentView;
        var action = new SelectAction(parentView);

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('srcDataSourceName', metadata.SourceValue.DataBinding.Source);
        action.setProperty('srcPropertyName', metadata.SourceValue.DataBinding.Property);
        action.setProperty('dstDataSourceName', metadata.DestinationValue.DataBinding.Source);
        action.setProperty('dstPropertyName', metadata.DestinationValue.DataBinding.Property);

        return action;
    }
}

