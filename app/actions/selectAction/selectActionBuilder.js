function SelectActionBuilder() {
    this.build = function (context, args) {
        var builder = args.builder,
            metadata = args.metadata,
            parentView = args.parentView;
        var action = new SelectAction(parentView);

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});
        var dstBinding = builder.build(metadata['DestinationValue'], {parentView: parentView});
        var srcBinding = builder.build(metadata['SourceValue'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('srcBinding', srcBinding);
        action.setProperty('dstBinding', dstBinding);

        return action;
    }
}

