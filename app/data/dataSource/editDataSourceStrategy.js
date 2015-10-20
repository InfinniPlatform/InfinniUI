function EditDataSourceStrategy(dataSource) {

    this.dataSource = dataSource;
    this.getItems = function (dataProvider, resultCallback) {
        var itemId = dataSource.getIdFilter();

        var callback = function () {
            var args = Array.prototype.slice.call(arguments);
            if (resultCallback) {
                resultCallback.apply(undefined, args);
            }
            dataSource.loadingProcessDone();
        };

        /**
         * @description Добавляет идентификатор запроса. @see {@link DataProviderRequestQueue}
         */
        var setLocalId = function (data) {
            data['__Id'] = guid();
            return data;
        };

        var newItem = function () {
            var selectedItem = dataSource.getSelectedItem();
            if (selectedItem !== null && typeof selectedItem !== 'undefined') {
                //Если редактируется существующий элемент - возвращаем его же.
                callback(dataSource.getDataItems());
                return;
            }

            var createItem = dataSource.getFillCreatedItem();

            if (createItem === true) {
                dataProvider.createItem(function (data) {
                    callback([setLocalId(data)]);
                });
            }
            else {
                callback([
                    setLocalId({})
                ]);
            }

        };

        if (itemId !== null) {
            dataProvider.getItem(itemId, function (item) {
                if (item === null) {
                    newItem();
                }
                if (item && item.length > 0) {
                    callback([item[0]]);
                }
                else {
                    console.log('%c Document with identifier %s not found.', 'color: red', itemId);

                    messageBus.getExchange(itemId).send(messageTypes.onFilterError);
                }

                messageBus.getExchange(itemId).unsubscribeByType(messageTypes.onFilterError);
            });
        }
        else {
            newItem();
        }
    };

    this.bindItems = function (dataBinding, items) {
        //dataBinding.bind(items[0]);
        var propertyName = dataBinding.getProperty();
        var propertyValue;

        if (typeof propertyName !== 'undefined' && propertyName !== null && propertyName !== '') {
            if(propertyName == '$'){
               propertyValue = items[0];
            }else if(/^\$\..+$/.test(propertyName)){
               propertyValue = InfinniUI.ObjectUtils.getPropertyValue(items[0], propertyName.substr(2));
            }else{
                propertyValue = InfinniUI.ObjectUtils.getPropertyValue(items[0], propertyName);
            }
        } else {
            propertyValue = items[0];
        }
        dataBinding.bind(propertyValue);
    };


    this.onPageNumberChanged = function (value) {
    };

    this.onPageSizeChanged = function (value) {
    };

    this.onPropertyFiltersChanged = function (value) {

    };

    this.onTextFilterChanged = function (value) {

    };

    this.onBeforeItemSaved = function (value, result) {

    };

    this.onItemSaved = function (value, result) {

        var idProperty = this.dataSource.getIdProperty();
        var instanceId = InfinniUI.ObjectUtils.getPropertyValue(value, idProperty);

        if (typeof instanceId === 'undefined' || instanceId === null) {
            var instanceId = InfinniUI.ObjectUtils.getPropertyValue(result, 'InstanceId');
            InfinniUI.ObjectUtils.setPropertyValue(value, idProperty, instanceId);
        }


        this.invokeEventAsync('onBeforeItemSaved', value, function () {
            this.invokeEvent('onItemSaved', value);
        }.bind(this));
    };

    this.onBeforeItemCreated = function (value) {
        this.invokeEvent('onBeforeItemCreated', value);
    };

    /**
     * @param {Object} value
     * @param {String} value.InstanceId Идентификатор созданного документа
     * @param {String} value.ActionId
     * @param {String} value.ConfigId
     * @param {String} value.DocumentId
     */
    this.onItemCreated = function (value) {
        var instanceId = value.InstanceId || value.Id;
        this.invokeEventAsync('onBeforeItemCreated', instanceId, function () {
            this.invokeEvent('onItemCreated', instanceId);
        }.bind(this));
    };

    this.onItemDeleted = function (value) {
        this.invokeEvent('onItemDeleted', value);
    };

    this.onItemsUpdated = function (value) {


        // Выделение первого элемента в списке, чтобы сработала привязка данных
        dataSource.setSelectedItem(value ? value[0] : null);

        this.invokeEvent('onItemsUpdated', value[0]);
    };

    this.onError = function (value) {
        this.invokeEvent('onError', value);
    };

    /**
     * Для правильной привязки в методе {@link BaseDataSource.addDataBinding} необходимо,
     * чтобы selectedItem указывал на экземпляр данных {@link BaseDataSource.dataItems}.
     *
     * @param value
     * @returns {*}
     */
    this.syncSelectedItem = function (value) {
        var dataItems = this.dataSource.getDataItems();
        if (typeof value === 'undefined' || value === null) {
            //value = {};
            return value;
        }

        var index = dataItems.indexOf(value);
        var selectedItem = value;

        if (index === -1 && dataItems[0]) {
            var i;
            selectedItem = dataItems[0];
            for (i in selectedItem) {
                if (selectedItem.hasOwnProperty(i)) {
                    delete selectedItem[i];
                }
            }
            for (i in value) {
                if (!value.hasOwnProperty(i)) continue;
                selectedItem[i] = value[i];
            }
        }
        return selectedItem;
    }
}


EditDataSourceStrategy.prototype = BaseDataSourceStrategy.prototype;