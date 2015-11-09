function AddItemActionBuilder(){

}

_.extend(AddItemActionBuilder.prototype, {
    build: function(context, args){
        var parentView = args.parentView,
            metadata= args.metadata;

        var dataSource = parentView.getContext().dataSources[metadata.Items.Source];
        var linkView = args.builder.build(metadata['LinkView'], {parentView: parentView});

        var action = new AddItemAction(parentView);

        action.setProperty('linkView', linkView);
        action.setProperty('dataSource', dataSource);
        action.setProperty('propertyName', metadata.Items.Property);

        return action;
    }
});