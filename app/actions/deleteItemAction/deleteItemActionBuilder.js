function DeleteItemActionBuilder(){

}

_.extend(DeleteItemActionBuilder.prototype, {
    build: function(context, args){
        var dataSource = args.parentView.getContext().dataSources[args.metadata.Items.DataBinding.Source];
        var accept = (args.metadata['Accept'] === false) ? false: true;

        if(!dataSource){
            console.log("%c %s: не найден DataSource с именем %s", "color: red", args.parentView.getName(), args.metadata.Items.DataBinding.Source);
        }

        var action = new DeleteItemAction(args.parentView);

        action.setProperty('accept', accept);
        action.setProperty('dataSource', dataSource);
        action.setProperty('propertyName', args.metadata.Items.DataBinding.Property);
        action.setProperty('index', _.last(args.basePathOfProperty.indexesInParentLists));

        return action;
    }
});