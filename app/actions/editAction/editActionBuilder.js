function EditActionBuilder(){
    this.build = function(context, args){
        var metadata = args.metadata,
            parentView = args.parentView,
            builder = args.builder;
        var action;

        if( _.isEmpty(metadata.DestinationValue.Property) ){
            action = new EditAction(parentView);
        } else {
            action = new EditItemAction(parentView);

            action.setProperty('destinationProperty', metadata.DestinationValue.Property);
            action.setProperty('index', _.last(args.basePathOfProperty.indexesInParentLists));
        }

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('destinationSource', metadata.DestinationValue.Source);
        action.setProperty('sourceSource', metadata.SourceValue.Source);

        return action;
    }
}


_.extend(EditActionBuilder.prototype, {
    build: function(context, args){
        var action = new EditAction(args.parentView);

        var metadata = args.metadata;
        var parentView = args.parentView;
        var builder = args.builder;
        var dataSource = parentView.getContext().dataSources[metadata.DataSource];
        var editingItemId;
        var linkView;

        if('itemId' in args){
            editingItemId = args.itemId;
        }else{
            var editItem = dataSource.getSelectedItem();
            editingItemId = dataSource.idOfItem(editItem);
        }

        linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('editingItemId', editingItemId);
        action.setProperty('parentDataSource', dataSource);

        return action;
    }
});