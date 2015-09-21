function BaseDataSource(view, idProperty, dataProvider) {

    this.eventStore = new EventStore();

    //public
    this.onPageNumberChanged = function (handler) {
        this.eventStore.addEvent('onPageNumberChanged', handler);
    };
    this.onPageSizeChanged = function (handler) {
        this.eventStore.addEvent('onPageSizeChanged', handler);
    };
    this.onItemDeleted = function (handler) {
        this.eventStore.addEvent('onItemDeleted', handler);
    };
    this.onBeforeItemSaved = function (handler) {
        this.eventStore.addEvent('onBeforeItemSaved', handler);
    };
    this.onItemSaved = function (handler) {
        this.eventStore.addEvent('onItemSaved', handler);
    };
    this.onTextFilterChanged = function (handler) {
        this.eventStore.addEvent('onTextFilterChanged', handler);
    };
    this.onPropertyFiltersChanged = function (handler) {
        this.eventStore.addEvent('onPropertyFiltersChanged', handler);
    };

    this.onBeforeItemCreated = function (handler) {
        this.eventStore.addEvent('onBeforeItemCreated', handler);
    };
    this.onItemCreated = function (handler) {
        this.eventStore.addEvent('onItemCreated', handler);
    };
    this.onItemsUpdated = function (handler) {
        return this.eventStore.addEvent('onItemsUpdated', handler);
    };
    this.onItemsDeleted = function (handler) {
        this.eventStore.addEvent('onItemsDeleted', handler);
    };

    //private
    var that = this;

    var _criteriaConstructor;
    var fillCreatedItem = true;
    var idFilter = null;
    var name = null;
    var dataItems = [];
    var currentStrategy = null;
    var listStrategy = new ListDataSourceStrategy(this);
    var editStrategy = new EditDataSourceStrategy(this);

    var propertyFilters = [];
    var queryFilter = null;
    var textFilter = null;
    var selectedItem = null;

    var pageSize = null;
    var pageNumber = null;

    var sorting = null;

    var dataBindings = [];

    var suspended = false;

    this.initingDataStrategy = 'manualInitingData';
    this.lazyInitingDataStarter = $.Deferred();

    this.lazyInitingDataStarter.done(function(){
        that.resumeUpdate();
    });

    this.isSuspended = function () {
        return suspended;
    };

    var _loadingProcess = $.Deferred();

    this.loading = _loadingProcess.promise();

    this.loadingProcessDone = function () {
        _loadingProcess.resolve();
    };

    //strategy by default
    currentStrategy = listStrategy;


    this.setCriteriaConstructor = function (criteriaConstructor) {
        _criteriaConstructor = criteriaConstructor;
    };

    this.getDataItems = function () {
        return dataItems;
    };

    this.setDataItems = function (value) {
        dataItems = value;
        currentStrategy.setDataItems(value);
        if (suspended) {
            suspended = false;
        }
        currentStrategy.onItemsUpdated(dataItems);
    };

    this.setSorting = function (value) {
        sorting = (typeof value === 'undefined') ? null : value;
    };

    this.getSorting = function () {
        return sorting;
    };

    var setListStrategy = function () {
        currentStrategy = listStrategy;
    };

    var setEditStrategy = function () {
        currentStrategy = editStrategy;
    };

    this.setUserStrategy = function (strategy) {
        currentStrategy = strategy;
    };

    var addOrUpdateItem = function (item) {
        if (dataItems.length == 1) {
            dataItems[0] = item;
        }
        else {
            //may be slow method to add
            dataItems.push(item);
        }
    };

    var removeById = function (itemId) {
        for (var i = 0; i < dataItems.length; i++) {
            if (dataItems[i].Id === itemId) {
                var indexToSplice = i;
                break;
            }
        }
        if (indexToSplice !== undefined) {
            dataItems.splice(indexToSplice, 1);
        }
    };

    var resetModified = function (item) {
        if (item != null) {
            var index = modifiedItems.indexOf(item);
            if (index > -1) {
                modifiedItems.splice(index, 1);
            }
        }
    };


    this.suspendUpdate = function () {
        suspended = true;
    };

    this.resumeUpdate = function (callback) {
        if (suspended) {
            suspended = false;
        }
        this.updateItems(callback);
    };

    this.getPageNumber = function () {
        return pageNumber;
    };

    this.setPageNumber = function (value) {
        if (value < 0) {
            value = 0;
        }

        if (value !== pageNumber) {
            pageNumber = value;
            if (currentStrategy.onPageNumberChanged !== null) {
                currentStrategy.onPageNumberChanged(value);
            }
            this.updateItems();
        }
    };

    this.getPageSize = function () {
        return pageSize;
    };

    this.setPageSize = function (value) {
        if (value < 0) {
            value = 0;
        }
        else if (value > 1000) {
            value = 1000;
        }

        var isPageSizeChanging = pageSize !== value;

        pageNumber = 0;
        pageSize = value;

        if (isPageSizeChanging && !suspended) {
            currentStrategy.onPageNumberChanged(pageNumber);
            currentStrategy.onPageSizeChanged(value);

            this.updateItems();
        }
    };


    this.getName = function () {
        return name;
    };

    this.setName = function (value) {
        name = value;
    };

    this.getIdProperty = function () {
        return idProperty || 'Id';
    };

    this.setIdProperty = function (value) {
        idProperty = value;
    };

    this.getFillCreatedItem = function () {
        return fillCreatedItem;
    };

    this.setFillCreatedItem = function (value) {
        fillCreatedItem = value || false;
    };

    this.getIdFilter = function () {
        return idFilter;
    };

    this.setIdFilter = function (value, silent) {
        if (idFilter !== value) {
            idFilter = value;
            if (!silent) {
                this.updateItems();
            }
        }
    };

    this.setEditMode = function () {
        setEditStrategy();
    };

    this.setListMode = function () {
        setListStrategy();
    };

    this.getView = function () {
        return view;
    };

    this.createItem = function () {
        dataProvider.createItem(
            function (data) {
                addOrUpdateItem(data);
                currentStrategy.onItemCreated(data);
                setModified(data);
            });
    };
    var warnings = false;

    this.showErrors = function(errors){
        if (_.isEmpty(errors) || errors.IsValid) {
            return;
        }
        if (errors.Message instanceof Array) {
            for (var i = 0; i < errors.Message.length; i++) {
                toastr.error(errors.Message[i].Message, "Ошибка!");
            }
        } else if(typeof errors.Message == 'string' && errors.Message.indexOf('{') >= 0){
            var result = JSON.parse(errors.Message);
            result = result.ValidationMessage &&
            result.ValidationMessage.ValidationErrors &&
            result.ValidationMessage.ValidationErrors.Message ? result.ValidationMessage.ValidationErrors.Message : 'Обратитесь к системному администратору';
            toastr.error(result, "Ошибка!");
        }else{
            toastr.error('Обратитесь к системному администратору', "Ошибка!");
        }
    };

    this.showWarnings = function(warnings){
        if (_.isEmpty(warnings) || warnings.IsValid) {
            return;
        }

        var resultText = warnings.Message[0].Message;
        for (var j = 1; j < warnings.Message.length; j++) {
            resultText += '<p><i class="fa-lg fa fa-warning" style="color: #45b6af; padding-right: 5px"></i>' + warnings.Message[j].Message;
        }
        resultText += '<p style="font-weight: bolder;">Продолжить добавление?';

        new MessageBox({
            text: resultText,
            buttons: [
                {
                    name: 'Да',
                    type: 'action',
                    onClick: attemptSave.bind(undefined, true)
                },
                {
                    name: 'Нет'
                }
            ]
        });
    };

    this.saveItem = function (item, onSuccess/*, onError*/) {
        var invokeCallback = function (callback) {
            if (typeof callback === 'function') {
                var args = Array.prototype.slice.call(arguments, 1);
                callback.apply(undefined, args);
            }
        };

        var idProperty = that.getIdProperty() || "Id";

        var self = this;

        var attemptSave = function (warnings) {
            dataProvider.replaceItem(item, warnings, function (data) {
                //TODO: убрать 'data.IsValid == undefined' когда заполнятся метаданные
                if ((data.IsValid || data.IsValid == undefined) ) {
                    if(!(data instanceof Array) && item != null) {
                        item[idProperty] = data.InstanceId || data.Id;
                        addOrUpdateItem(item);
                        currentStrategy.onItemSaved(item, data);
                        resetModified(item);
                    }
                    invokeCallback(onSuccess, data);
                } else {
                    var validation = data.ValidationMessage;
                    self.showErrors(validation.ValidationErrors);
                    self.showWarnings(validation.ValidationWarnings);
                    onSuccess(data);
                }
            });

        };

        attemptSave(warnings);
    };

    this.deleteItem = function (item) {
        var self = this;
        dataProvider.deleteItem(item, function (data) {
            if ((data.IsValid || data.IsValid == undefined) ) {
                removeById(item);
                currentStrategy.onItemDeleted(item);
            }else{
                var validation = data.ValidationMessage;
                self.showErrors(validation.ValidationErrors);
                self.showWarnings(validation.ValidationWarnings);
            }
        });
    };

    var loadItems = function (resultCallback) {
        currentStrategy.getItems(dataProvider, resultCallback);
    };

    this.getItems = function (resultCallback) {
        loadItems(resultCallback);
    };

    this.updateItems = function (callback) {
        if (!suspended) {
            loadItems(function (data) {

                dataItems = data;
                currentStrategy.onItemsUpdated(data);

                if (callback) {
                    callback(data);
                }
            });
        }
    };

    this.setQueryFilter = function (value, callback) {

        if (queryFilter !== value) {
            queryFilter = _criteriaConstructor(value);
            this.updateItems(callback);
        }
    };

    this.getQueryFilter = function () {
        return queryFilter;
    };

    this.setPropertyFilters = function (value) {
        if (propertyFilters !== value) {
            pageNumber = 0;
            propertyFilters = value;

            currentStrategy.onPageNumberChanged(0);
            currentStrategy.onPropertyFiltersChanged(value);
            this.updateItems();
        }
    };

    this.getPropertyFilters = function () {
        return propertyFilters;
    };

    this.getTextFilter = function () {
        return textFilter;
    };

    this.setTextFilter = function (value) {
        if (textFilter !== value) {
            pageNumber = 0;
            textFilter = value;
            var self = this;

            setTimeout(function () {
                currentStrategy.onPageNumberChanged(0);
                currentStrategy.onTextFilterChanged(value);
                self.updateItems();
            }, 30)
        }
    };

    this.addDataBinding = function (binding, initingDataStrategy) {
        if (binding !== null) {
            handleInitingDataStrategy(initingDataStrategy);

            dataBindings.push(binding);

            binding.onSetPropertyValue(onSetPropertyValueHandler);


            if (!suspended) {

                //устанавливаем значение элемента
                currentStrategy.bindItems(binding, dataItems, this);

            }

        }
    };

    function handleInitingDataStrategy(initingDataStrategy){
        if(initingDataStrategy && initingDataStrategy.name == 'lazyInitingData' && (that.initingDataStrategy == 'manualInitingData' || that.initingDataStrategy == 'lazyInitingData')){
            that.initingDataStrategy = 'lazyInitingData';
            initingDataStrategy.starter.done(function(){
                that.lazyInitingDataStarter.resolve();
            });
        }

        if(!initingDataStrategy){
            that.initingDataStrategy = 'previouslyInitingData';
            that.lazyInitingDataStarter.reject();

            if(view.isLoading()){
                that.resumeUpdate();
            }
        }
    }

    this.removeDataBinding = function (value) {
        var itemIndex = dataBindings.indexOf(value);
        if (itemIndex > -1) {
            dataBindings.splice(itemIndex, 1);

            //remove data binding problem
            value.removeOnSetPropertyValue(onSetPropertyValueHandler);
        }
    };

    this.getSelectedItem = function () {
        if (selectedItem === undefined || selectedItem === null) {
            return null;
        }

        return JSON.parse(JSON.stringify(selectedItem));
    };

    this.setSelectedItem = function (value) {
        var isEmpty = function (value) {
            return typeof value === 'undefined' || value === null;
        };

        if (isEmpty(value) || isEmpty(selectedItem)) {
            if (isEmpty(value) && isEmpty(selectedItem)) {
                return;
            }
        } else {
            if (JSON.stringify(selectedItem) === JSON.stringify(value)) {
                return;
            }
        }
        //TODO: Проверить работу selectedItem в ListBox
        //if (JSON.stringify(selectedItem) === JSON.stringify(value)) {
        //    return;
        //}

        selectedItem = currentStrategy.syncSelectedItem(value);
        currentStrategy.onSelectedItemChanged(selectedItem);
    };

    this.getDataBindings = function () {
        return dataBindings;
    };

    var onSetPropertyValueHandler = function (context, args) {
        var propertyName = args.property;
        var propertyValue = args.value;

        if (propertyName !== undefined && propertyName !== null) {
            var selectedItem = that.getSelectedItem();

            if (selectedItem === null) {
                selectedItem = {};
            }

            if (/^\d+\..*$/.test(propertyName) && Array.isArray(dataItems)) {
                InfinniUI.ObjectUtils.setPropertyValue(dataItems, propertyName, propertyValue);
                //Допущение, что SelectedItem указывает на тотже элемент
                InfinniUI.ObjectUtils.setPropertyValue(selectedItem, propertyName.replace(/^\d+\./, ''), propertyValue);
                that.setSelectedItem(selectedItem);
                setModified(selectedItem);
            } else
            if (selectedItem !== null) {
                if (propertyName.length > 2 && propertyName.substring(0, 2) === '$.') {
                    InfinniUI.ObjectUtils.setPropertyValue(selectedItem, propertyName.substr(2), propertyValue);
                }
                else if (propertyName !== '$') {
                    InfinniUI.ObjectUtils.setPropertyValue(selectedItem, propertyName, propertyValue);
                }
                else {
                    for (var property in selectedItem) {
                        delete(selectedItem[property]);
                    }

                    for (var property in propertyValue) {
                        selectedItem[property] = propertyValue[property];
                    }
                }
                that.setSelectedItem(selectedItem);
                setModified(selectedItem);
            }

            var bindings = that.getDataBindings();
            for (var i = 0; i < bindings.length; i++) {
                if (bindings[i].getProperty() === propertyName) {
                    bindings[i].propertyValueChanged(propertyValue);
                }
            }

            that.eventStore.executeEvent('onSelectedItemModified');
        }
    };

    this.onSelectedItemChanged = function (action) {
        this.eventStore.addEvent('onSelectedItemChanged', action);
    };

    this.onSelectedItemModified = function (action) {
        this.eventStore.addEvent('onSelectedItemModified', action);
    };

    //Добавляем событие по умолчанию (уведомление всех датабиндингов)
    this.onSelectedItemChanged(function (context, args) {
        var selectedItem = args.value;

        for (var i = 0; i < dataBindings.length; i++) {
            var propertyName = dataBindings[i].getProperty();

            if (/^\d+/.test(propertyName)) {
                /**
                 * @TODO Костыль! Чтобы при изменении выбранного элемента, в привязки для ItemTemplate не вкидывались
                 * неверные данные из selectedItem
                 */
            } else if (propertyName) {
                if (propertyName.length > 2 && propertyName.substring(0, 2) === '$.') {
                    var propertyValue = InfinniUI.ObjectUtils.getPropertyValue(selectedItem, propertyName.substring(2, propertyName.length));
                }

                else if (propertyName !== '$') {
                    var propertyValue = InfinniUI.ObjectUtils.getPropertyValue(selectedItem, propertyName); //selectedItem[propertyName];
                }

                else {
                    var propertyValue = selectedItem;
                }

                dataBindings[i].propertyValueChanged(propertyValue);
            }
        }
    });

    this.onItemsUpdated(function (context, args) {
        var items = args.value;
        _.each(dataBindings, function (binding) {
            if (binding.property === '$') {
                var value = this.getSelectedItem();
            } else if (/^\$\..+$/.test(binding.property)) {
                var value = InfinniUI.ObjectUtils.getPropertyValue(this.getSelectedItem(), binding.property.substr(2));
            } else {
                var value = InfinniUI.ObjectUtils.getPropertyValue(items, binding.property);
            }
            binding.bind(value);
        }, that);
    });


    var modifiedItems = [];

    this.isModifiedItems = function () {
        return modifiedItems.length > 0;
    };

    this.isModified = function (value) {
        var isModified = value != null && value !== undefined;
        if (!isModified) {
            return false;
        }
        else {
            var index = modifiedItems.indexOf(value);
            return index > -1;
        }
    };

    var setModified = function (value) {
        if (value != null) {
            modifiedItems.push(value);
        }
    };


}

function isMainDataSource(ds) {
    return ds.getName() == 'MainDataSource';
}