function EditActionBuilder() {
    this.build = function (builder, parent, metadata, itemCollection, itemId) {
        var action = new BaseAction(parent);

        action.setAction(function (callback) {
            var parentDataSource = parent.getDataSource(metadata.DataSource),
                editItem, idProperty, editItemId;

            if(itemId){
                editItemId = itemId;
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

            var linkView = builder.build(parent, metadata.View);
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
}