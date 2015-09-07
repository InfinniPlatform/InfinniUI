function DeleteActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseAction(parent);
        action.setAction(function (callback) {
            new MessageBox({
                text: 'Вы уверены, что хотите удалить?',
                buttons: [
                    {
                        name: 'Да',
                        type: 'action',
                        onClick: function () {
                            var parentDataSource = parent.getDataSource(metadata.DataSource),
                                editItem = parentDataSource.getSelectedItem(),
                                idProperty = parentDataSource.getIdProperty();

                            if (editItem && idProperty) {
                                var editItemId = InfinniUI.ObjectUtils.getPropertyValue(editItem, idProperty);

                                if (editItemId) {
                                    parentDataSource.onItemDeleted(function (dataSourceName, value) {
                                        parentDataSource.setIdFilter(null, true);
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