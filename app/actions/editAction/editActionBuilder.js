function EditActionBuilder(){

}


_.extend(EditActionBuilder.prototype, {
    build: function(context, args){
        var action = new EditActionBuilder(args.parentView);

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


/*function EditActionBuildero() {
    this.build = function (context, args) {
        var action = new BaseAction(args.view);

        action.setAction(function (callback) {
            var parentDataSource = args.view.getDataSource(args.metadata.DataSource),
                editItem, idProperty, editItemId;

            if(args.itemId){
                editItemId = args.itemId;
            }else{
                editItem = parentDataSource.getSelectedItem();

                if(!editItem){
                    new MessageBox({
                        type: 'error',
                        text:'Не выбран объект для редактирования.',
                        buttons:[
                            {
                                name:'Закрыть'
                            }
                        ]
                    });
                    return;
                }

                idProperty = parentDataSource.getIdProperty();
                editItemId = InfinniUI.ObjectUtils.getPropertyValue(editItem, idProperty);
            }

            var linkView = args.builder.build(args.view, args.metadata.View);
            linkView.createView(function (editView) {
                var editDataSource = _.find(editView.getDataSources(), function (ds) {
                    return isMainDataSource(ds);
                });

                editDataSource.suspendUpdate();
                editDataSource.setEditMode();
                editDataSource.setIdFilter(editItemId);

                editView.onClosed(function (closeResult) {
                    parentDataSource.updateItems();

                    if (callback && closeResult == dialogResult.accept) {

                        callback(editItemId);
                    }
                });

                editView.open();
            });
        });

        return action;
    };
}*/