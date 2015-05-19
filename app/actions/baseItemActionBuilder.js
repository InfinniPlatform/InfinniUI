function BaseItemActionBuilder() {

    this.build = function (builder, parent, metadata) {

        var action = new BaseItemAction(parent);

        var itemsDataBinding = builder.build(parent, metadata.Items);

        if (itemsDataBinding !== null) {

            itemsDataBinding.onPropertyValueChanged(function (context, args) {

                var collectionItems = itemsDataBinding.getPropertyValue();

                action.setItems(collectionItems);
            });


            action.onValueChanged(function (context, args) {
                itemsDataBinding.setPropertyValue( args.value);
            });


            //если источник данных двунаправленный
            if (itemsDataBinding.getDataSource) {

                var dataSourceName = itemsDataBinding.getDataSource();
                var propertyName = itemsDataBinding.getProperty();

                //TODO: Необходимо добавить обработку событий OnItemAdded
                //TODO: и OnItemDeleted и пересмотреть концепции байдинга коллекций
/*                action.onItemAdded(function(context,args){
                    parent.getDataSource(dataSourceName).updateItems();
                });

                action.onItemRemoved(function(context,args){
                    parent.getDataSource(dataSourceName).updateItems();
                });*/

                var exchange = parent.getExchange();

                //при изменении выбранного элемента в AddAction (при добавлении нового элемента)
                //уведомляем всех подписчиков - dataBindings
                action.onSetSelectedItem(function(context, args){
                    action.getView().getExchange().send(messageTypes.onSetSelectedItem,{
                        dataSource : dataSourceName,
                        property : propertyName,
                        //@TODO Разобраться почему иногда приходит уже вложенное значени в args.value.
                        value : (typeof args.value === 'undefined') ? args : args.value,
                        isActionSource : true //добавлено с целью избежания зацикливания обработчиков
                    });
                });

                exchange.subscribe(messageTypes.onSetSelectedItem, function (value) {
                    if (dataSourceName === value.dataSource && value.property !== null && value.property !== undefined && !value.isActionSource ) {
                        action.setSelectedItem(value.value);
                    }
                });
            }

        }

        return action;
    }
}