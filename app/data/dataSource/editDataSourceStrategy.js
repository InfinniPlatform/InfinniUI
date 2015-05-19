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
                    callback([data]);
                });
            }
            else {
                callback([
                    {}
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
                    throw stringUtils.format('document with identifier {0} not found.', [itemId]);
                }

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
            propertyValue = InfinniUI.ObjectUtils.getPropertyValue(items[0], propertyName);
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

    this.onItemSaved = function (value, result) {

        var idProperty = this.dataSource.getIdProperty();
        var instanceId = InfinniUI.ObjectUtils.getPropertyValue(value, idProperty);

        if (typeof instanceId === 'undefined' || instanceId === null) {
            var instanceId = InfinniUI.ObjectUtils.getPropertyValue(result, 'InstanceId');
            InfinniUI.ObjectUtils.setPropertyValue(value, idProperty, instanceId);
        }

        this.invokeEvent('onItemSaved', value);
    };

    /**
     * @param {Object} value
     * @param {String} value.InstanceId Идентификатор созданного документа
     * @param {String} value.ActionId
     * @param {String} value.ConfigId
     * @param {String} value.DocumentId
     */
    this.onItemCreated = function (value) {
        this.invokeEvent('onItemCreated', value.InstanceId);
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

        if (index === -1) {
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