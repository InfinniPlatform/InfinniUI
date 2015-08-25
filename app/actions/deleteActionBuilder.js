function DeleteActionBuilder() {
    this.build = function (context, args) {
        var action = new BaseAction(args.view);
        action.setAction(function (callback) {
            new MessageBox({
                text: 'Вы уверены, что хотите удалить?',
                buttons: [
                    {
                        name: 'Да',
                        type: 'action',
                        onClick: function () {
                            var parentDataSource = args.view.getDataSource(args.metadata.DataSource),
                                editItem = parentDataSource.getSelectedItem(),
                                idProperty = parentDataSource.getIdProperty();

                            if (editItem && idProperty) {
                                var editItemId = InfinniUI.ObjectUtils.getPropertyValue(editItem, idProperty);

                                if (editItemId) {
                                    parentDataSource.onItemDeleted(function (dataSourceName, value) {
                                        parentDataSource.updateItems();

//                                      TODO: Переделать механизм удаления обработчиков
//                                      parentDataSource.onItemDeleted = null;
                                        if (callback) {
                                            callback();
                                        }

                                    });
                                    parentDataSource.deleteItem(editItemId);
                                }
                            }
                        }
                    },
                    {
                        name: 'Нет'
                    }
                ]
            });
        });

        return action;
    }
}