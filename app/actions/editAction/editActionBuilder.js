function EditActionBuilder(){

}


_.extend(EditActionBuilder.prototype, {
    build: function(context, args){
        var action = new EditAction(args.parentView);

        var metadata = args.metadata;
        var parentView = args.parentView;
        var builder = args.builder;
        var dataSource = parentView.getDataSources()[metadata.DataSource];
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