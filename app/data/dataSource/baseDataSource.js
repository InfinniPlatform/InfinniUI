/**
 * @constructor
 * @augments Backbone.Model
 * @mixes dataSourceFileProviderMixin
 */
var BaseDataSource = Backbone.Model.extend({
    defaults: {
        name: null,
        idProperty: 'Id',
        pageNumber: 0,
        pageSize: 15,
        sorting: null,
        criteriaList: [],

        view: null,

        isDataReady: false,

        dataProvider: null,

        modifiedItems: {},
        items: null,
        itemsById: {},
        selectedItem: null,

        fillCreatedItem: true,
        isUpdateSuspended: false,

        errorValidator: null,
        warningValidator: null,
        showingWarnings: false,

        isRequestInProcess: false,

        bindingBuilder: function(){} // нужен для создания биндингов в фильтрах

    },

    initialize: function () {
        this.initDataProvider();

        if (!this.get('view')) {
            throw 'BaseDataSource.initialize: При создании объекта не была задана view.'
        }
    },

    initDataProvider: function () {
        throw 'BaseDataSource.initDataProvider В потомке BaseDataSource не задан провайдер данных.'
    },

    onPageNumberChanged: function (handler) {
        this.on('change:pageNumber', handler);
    },

    onPageNumberSize: function (handler) {
        this.on('change:pageSize', handler);
    },

    onError: function (handler) {
        this.on('error', handler);
    },

    onPropertyChanged: function (property, handler) {
        if (typeof property == 'function') {
            handler = property;
            this.on('onPropertyChanged', handler);
        } else {
            this.on('onPropertyChanged:' + property, handler);
        }

    },

    onSelectedItemChanged: function (handler) {
        this.on('onSelectedItemChanged', handler);
    },

    onSelectedItemModified: function (handler) {
        this.on('onPropertyChanged', handler);
    },

    onErrorValidator: function (handler) {
        this.on('onErrorValidator', handler);
    },

    onWarningValidator: function (handler) {
        this.on('onWarningValidator', handler);
    },

    onItemSaved: function (handler) {
        this.on('onItemSaved', handler);
    },

    onItemCreated: function (handler) {
        this.on('onItemCreated', handler);
    },

    onItemsUpdated: function (handler) {
        this.on('onItemsUpdated', handler);
    },

    onItemDeleted: function (handler) {
        this.on('onItemDeleted', handler);
    },

    getName: function () {
        return this.get('name');
    },

    setName: function (name) {
        this.set('name', name);
        this.name = name;
    },

    getView: function () {
        return this.get('view');
    },

    getItems: function () {
        return this.get('items');
    },

    _setItems: function (items) {
        var indexOfItemsById;

        this.set('isDataReady', true);
        this.set('items', items);
        this._clearModifiedSet();
        if (items && items.length > 0) {
            indexOfItemsById = this._indexItemsById(items);
            this.set('itemsById', indexOfItemsById);

            this.setSelectedItem(items[0]);
        } else {
            this.setSelectedItem(null);
        }

        this._notifyAboutItemsUpdatedAsPropertyChanged(items);
        //this.trigger('settingNewItemsComplete');
    },

    _addItems: function (newItems) {
        var indexedItemsById = this.get('itemsById'),
            items = this.getItems(),
            newIndexedItemsById;

        this.set('isDataReady', true);
        items = _.union(items, newItems);
        this.set('items', items);
        if (newItems && newItems.length > 0) {
            newIndexedItemsById = this._indexItemsById(newItems);
            _.extend(indexedItemsById, newIndexedItemsById);
            this.set('itemsById', indexedItemsById);
        }

        this._notifyAboutItemsUpdatedAsPropertyChanged(items);
        //this.trigger('settingNewItemsComplete');
    },

    getSelectedItem: function () {
        return this.get('selectedItem');
    },

    setSelectedItem: function (item, success, error) {
        var currentSelectedItem = this.getSelectedItem(),
            items = this.get('itemsById'),
            itemId = this.idOfItem(item);


        if (typeof item == 'undefined') {
            item = null;
        }

        if (item == currentSelectedItem) {
            return;
        }

        if (item !== null) {
            if (!items[itemId]) {
                if (!error) {
                    throw 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.';
                } else {
                    error(this.getContext(), {error: 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.'});
                    return;
                }
            }
        }

        this.set('selectedItem', item);

        this._notifyAboutSelectedItem(item, success);
    },

    _notifyAboutSelectedItem: function (item, successHandler) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;

        if (successHandler) {
            successHandler(context, argument);
        }
        this.trigger('onSelectedItemChanged', context, argument);
    },

    getIdProperty: function () {
        return this.get('idProperty');
    },

    setIdProperty: function (value) {
        this.set('idProperty', value);
    },

    getFillCreatedItem: function () {
        return this.get('fillCreatedItem');
    },

    setFillCreatedItem: function (fillCreatedItem) {
        this.set('fillCreatedItem', fillCreatedItem);
    },

    suspendUpdate: function () {
        this.set('isUpdateSuspended', true);
    },

    resumeUpdate: function () {
        this.set('isUpdateSuspended', false);
    },

    getPageNumber: function () {
        return this.get('pageNumber');
    },

    setPageNumber: function (value) {
        if (!Number.isInteger(value) || value < 0) {
            throw 'BaseDataSource.setPageNumber() Заданно недопустимое значение: ' + value + '. Должно быть целое, неотрицательное число.';
        }

        if (value != this.get('pageNumber')) {
            this.set('pageNumber', value);
            this.updateItems();
        }
    },

    getPageSize: function () {
        return this.get('pageSize');
    },

    setPageSize: function (value) {
        if (!Number.isInteger(value) || value < 0) {
            throw 'BaseDataSource.setPageSize() Заданно недопустимое значение: ' + value + '. Должно быть целое, неотрицательное число.';
        }

        if (value != this.get('pageSize')) {
            this.set('pageSize', value);
            this.updateItems();
        }
    },

    isModifiedItems: function () {
        return this.isModified();
    },

    isModified: function (item) {
        if (arguments.length == 0) {
            return _.size(this.get('modifiedItems')) > 0;
        }

        if (item === null || item === undefined) {
            return false;
        }
        else {
            var itemId = this.idOfItem(item);
            return itemId in this.get('modifiedItems');
        }
    },

    _includeItemToModifiedSet: function (item) {
        var itemId = this.idOfItem(item);
        this.get('modifiedItems')[itemId] = item;
    },

    _excludeItemFromModifiedSet: function (item) {
        var itemId = this.idOfItem(item);
        delete this.get('modifiedItems')[itemId];
    },

    _clearModifiedSet: function () {
        this.set('modifiedItems', {});
    },

    getProperty: function (property) {
        var selectedItem = this.getSelectedItem(),
            bindingByIndexRegEx = /^\d/,
            relativeProperty, source;

        if(!this.isDataReady()){
            return undefined;
        }

        if (property == '') {
            return this.getItems();
        } else if (property == '$') {
            return selectedItem;
        } else {
            if (property.substr(0, 2) == '$.') {
                relativeProperty = property.substr(2);
                source = selectedItem;
            } else {
                relativeProperty = property;

                if (bindingByIndexRegEx.test(property)) {
                    source = this.getItems();
                } else {
                    source = selectedItem;
                }
            }


            return InfinniUI.ObjectUtils.getPropertyValue(source, relativeProperty);


        }
    },

    setProperty: function (property, value) {
        var selectedItem = this.getSelectedItem(),
            bindingByIndexRegEx = /^\d/,
            relativeProperty, oldValue, source;

        if (!selectedItem) {
            return;
        }

        if (property == '') {
            oldValue = this.getItems();
            this._setItems(value);

        } else if (property == '$') {
            if (value != selectedItem) {
                oldValue = this._copyObject(selectedItem);
                this._replaceAllProperties(selectedItem, value);
            } else {
                return;
            }

        } else {
            if (property.substr(0, 2) == '$.') {
                relativeProperty = property.substr(2);
                source = selectedItem;
            } else {
                relativeProperty = property;

                if (bindingByIndexRegEx.test(property)) {
                    source = this.getItems();
                } else {
                    source = selectedItem;
                }
            }

            oldValue = InfinniUI.ObjectUtils.getPropertyValue(source, relativeProperty);
            if (value != oldValue) {
                InfinniUI.ObjectUtils.setPropertyValue(source, relativeProperty, value);
            } else {
                return;
            }
        }

        this._includeItemToModifiedSet(selectedItem);
        this._notifyAboutPropertyChanged(property, value, oldValue);
    },

    prepareAndGetProperty: function(property, onReady){
        var that = this;

        if (this.get('isDataReady')){
            onReady( this.getProperty(property) );
        }else{
            if (!this.get('isRequestInProcess')){
                this.updateItems();
            }

            this.once('onItemsUpdated', function(){
                onReady( that.getProperty(property) );
            });
        }
    },

    tryInitData: function(){
        if (!this.get('isDataReady') && !this.get('isRequestInProcess')){
            this.updateItems();
        }
    },

    _notifyAboutPropertyChanged: function (property, newValue, oldValue) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.property = property;
        argument.newValue = newValue;
        argument.oldValue = oldValue;

        this.trigger('onPropertyChanged', context, argument);
        this.trigger('onPropertyChanged:' + property, context, argument);
    },

    saveItem: function (item, success, error) {
        var dataProvider = this.get('dataProvider'),
            ds = this,
            logger = window.InfinniUI.global.logger,
            validateResult;

        if (!this.isModified(item)) {
            this._notifyAboutItemSaved(item, 'notModified', success);
            return;
        }

        validateResult = this.validateOnErrors(item);
        if (!validateResult.isValid) {
            this._notifyAboutFailValidationBySaving(item, validateResult, error);
            return;
        }

        dataProvider.saveItem(item, function (data) {
            if (!('isValid' in data) || data.isValid === true) {
                //@TODO Что приходит в ответ на сохранение?????
                ds.uploadFiles(data.Id)
                    .then(function () {
                        ds._excludeItemFromModifiedSet(item);
                        ds._notifyAboutItemSaved(item, data, success);
                    }, function (err) {
                        logger.error(err);
                        if (error) {
                            error(err);
                        }
                    });
            } else {
                ds._notifyAboutFailValidationBySaving(item, data, error);
            }
        });
    },

    _notifyAboutItemSaved: function (item, result, successHandler) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;
        argument.result = result;

        if (successHandler) {
            successHandler(context, argument);
        }
        this.trigger('onItemSaved', context, argument);
    },

    _notifyAboutFailValidationBySaving: function (item, validationResult, errorHandler) {
        this._notifyAboutValidation(validationResult, errorHandler, 'error');
    },

    deleteItem: function (item, success, error) {
        var dataProvider = this.get('dataProvider'),
            that = this,
            itemId = this.idOfItem(item),
            isItemInSet = this.get('itemsById')[itemId] !== undefined;

        if (!isItemInSet) {
            this._notifyAboutMissingDeletedItem(item, error);
            return;
        }

        dataProvider.deleteItem(item, function (data) {
            if (!('isValid' in data) || data.isValid === true) {
                that._handleDeletedItem(item, success);
            } else {
                that._notifyAboutFailValidationByDeleting(item, data, error);
            }
        });
    },

    _handleDeletedItem: function (item, successHandler) {
        var items = this.get('items'),
            idProperty = this.get('idProperty'),
            itemId = this.idOfItem(item),
            selectedItem = this.getSelectedItem();

        for (var i = 0, ii = items.length, needExit = false; i < ii && !needExit; i++) {
            if (items[i][idProperty] == itemId) {
                items.splice(i, 1);
                needExit = true;
            }
        }
        delete this.get('itemsById')[itemId];
        this._excludeItemFromModifiedSet(item);

        if (selectedItem && selectedItem[idProperty] == itemId) {
            this.setSelectedItem(null);
        }

        this._notifyAboutItemDeleted(item, successHandler);
    },

    _notifyAboutItemDeleted: function (item, successHandler) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;

        if (successHandler) {
            successHandler(context, argument);
        }
        this.trigger('onItemDeleted', context, argument);
    },

    _notifyAboutMissingDeletedItem: function (item, errorHandler) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;
        argument.error = {
            message: 'Нельзя удалить элемент, которого нет текущем наборе источника данных'
        };

        if (errorHandler) {
            errorHandler(context, argument);
        }
    },

    _notifyAboutFailValidationByDeleting: function (item, errorData, errorHandler) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;
        argument.error = errorData;

        if (errorHandler) {
            errorHandler(context, argument);
        }
    },

    isDataReady: function () {
        return this.get('isDataReady');
    },

    getItems: function () {
        var logger = window.InfinniUI.global.logger;

        if (!this.isDataReady()) {
            logger.warn({
                message: 'BaseDataSource: Попытка получить данные источника данных (' + this.get('name') + '), до того как он был проинициализирован данными',
                source: this
            });
        }

        return this.get('items');
    },

    updateItems: function (onSuccess, onError) {
        if (!this.get('isUpdateSuspended')) {
            var filters = this.getFilter(),
                pageNumber = this.get('pageNumber'),
                pageSize = this.get('pageSize'),
                sorting = this.get('sorting'),
                dataProvider = this.get('dataProvider'),
                that = this;

            this.set('isRequestInProcess', true);
            dataProvider.getItems(filters, pageNumber, pageSize, sorting, function (data) {

                that.set('isRequestInProcess', false);
                that._handleUpdatedItemsData(data, onSuccess);

            }, onError);
        }

    },

    _handleUpdatedItemsData: function (itemsData, successHandler) {
        this._setItems(itemsData);
        this._notifyAboutItemsUpdated(itemsData, successHandler);
    },

    _notifyAboutItemsUpdated: function (itemsData, successHandler) {
        var context = this.getContext(),
            argument = {
                value: itemsData
            };

        if (successHandler) {
            successHandler(context, argument);
        }
        this.trigger('onItemsUpdated', context, argument);
    },

    _notifyAboutItemsUpdatedAsPropertyChanged: function (itemsData) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.property = '';
        argument.newValue = itemsData;
        argument.oldValue = null;

        this.trigger('onPropertyChanged', context, argument);
        this.trigger('onPropertyChanged:', context, argument);
    },

    addNextItems: function (success, error) {
        if (!this.get('isUpdateSuspended')) {
            var filters = this.getFilter(),
                pageNumber = this.get('pageNumber'),
                pageSize = this.get('pageSize'),
                sorting = this.get('sorting'),
                dataProvider = this.get('dataProvider'),
                that = this;

            this.set('isRequestInProcess', true);
            this.set('pageNumber', pageNumber + 1);
            dataProvider.getItems(filters, pageNumber + 1, pageSize, sorting, function (data) {

                that.set('isRequestInProcess', false);
                that._handleAddedItems(data, success);

            }, error);
        }
    },

    _handleAddedItems: function (itemsData, successHandler) {
        this._addItems(itemsData);
        this._notifyAboutItemsAdded(itemsData, successHandler);

    },

    _notifyAboutItemsAdded: function (itemsData, successHandler) {
        var context = this.getContext(),
            argument = {
                value: itemsData
            };

        if (successHandler) {
            successHandler(context, argument);
        }
        this.trigger('onItemsAdded', context, argument);
    },

    createItem: function (success, error) {
        var dataProvider = this.get('dataProvider'),
            idProperty = this.get('idProperty'),
            that = this,
            localItem;

        if (this.get('fillCreatedItem')) {
            dataProvider.createItem(
                function (item) {
                    that._handleDataForCreatingItem(item, success);
                },
                idProperty
            );
        } else {
            localItem = dataProvider.createLocalItem(idProperty);
            this._handleDataForCreatingItem(localItem, success);
        }
    },

    _handleDataForCreatingItem: function (itemData, successHandler) {
        var items = this.get('items');

        if(items) {
            items = items.slice();
            items.push(itemData);
        }else{
            items = [itemData];
        }

        this._setItems(items);
        this.setSelectedItem(itemData);
        this._notifyAboutItemCreated(itemData, successHandler);
    },

    _notifyAboutItemCreated: function (createdItem, successHandler) {
        var context = this.getContext(),
            argument = {
                value: createdItem
            };

        if (successHandler) {
            successHandler(context, argument);
        }
        this.trigger('onItemCreated', context, argument);
    },

    getFilter: function () {
        return this.get('criteriaList');
    },

    setFilter: function (filters) {
        var bindingBuilder = this.get('bindingBuilder');
        var boundFilter = new BoundFilter(filters, bindingBuilder);
        var that = this;

        if(boundFilter.isReady()){
            that._setCriteriaList(boundFilter.getCriteriaList());
        }

        boundFilter.onChange(function(newCriteriaList){
            if(boundFilter.isReady()){
                that._setCriteriaList(newCriteriaList);
            }
        });

        //this._setCriteriaList(filters);
    },

    _setCriteriaList: function(criteriaList){
        this.set('criteriaList', criteriaList);
        this.updateItems();
    },

    setIdFilter: function (itemId) {
        var dataProvider = this.get('dataProvider'),
            idFilter = dataProvider.createIdFilter(itemId);

        this.setFilter(idFilter);
    },

    getErrorValidator: function () {
        return this.get('errorValidator');
    },

    setErrorValidator: function (validatingFunction) {
        this.set('errorValidator', validatingFunction);
    },

    getWarningValidator: function () {
        return this.get('warningValidator');
    },

    setWarningValidator: function (validatingFunction) {
        this.set('warningValidator', validatingFunction);
    },

    validateOnErrors: function (item, callback) {
        return this._validatingActions(item, callback, 'error');
    },

    validateOnWarnings: function (item, callback) {
        return this._validatingActions(item, callback, 'warning');
    },

    _validatingActions: function (item, callback, validationType) {
        var validatingFunction = validationType == 'error' ? this.get('errorValidator') : this.get('warningValidator'),
            result = {
                isValid: true,
                items: []
            },
            isCheckingOneItem = !!item,
            context = this.getContext(),
            items, subResult, itemIndex;

        if (validatingFunction) {
            if (isCheckingOneItem) {

                result = validatingFunction(context, item);

            } else {

                items = this.getItems();
                for (var i = 0, ii = items.length; i < ii; i++) {

                    subResult = validatingFunction(context, items[i]);
                    if (!subResult.isValid) {
                        this._addIndexToPropertiesOfValidationMessage(subResult.items, i);
                        result.isValid = false;
                        result.items = _.union(result.items, subResult.items);
                    }

                }

            }
        }

        this._notifyAboutValidation(result, callback, validationType);

        return result;
    },

    _addIndexToPropertiesOfValidationMessage: function (validationMessages, index) {
        for (var i = 0, ii = validationMessages.length; i < ii; i++) {
            validationMessages[i].property = index + '.' + validationMessages[i].property;
        }
    },

    _notifyAboutValidation: function (validationResult, validationHandler, validationType) {
        var context = this.getContext(),
            argument = {
                value: validationResult
            };

        if (validationHandler) {
            validationHandler(context, argument);
        }

        if (validationType == 'error') {
            this.trigger('onErrorValidator', context, argument);
        } else {
            this.trigger('onWarningValidator', context, argument);
        }
    },

    getContext: function () {
        return this.getView().getContext();
    },

    _indexItemsById: function (items) {
        var idProperty = this.get('idProperty'),
            result = {},
            idValue;
        for (var i = 0, ii = items.length; i < ii; i++) {
            idValue = items[i][idProperty];
            result[idValue] = items[i];
        }

        return result;
    },

    idOfItem: function (item) {
        var idProperty = this.get('idProperty');
        if (!item) {
            return undefined;
        }
        return item[idProperty];
    },

    getCurrentRequestPromise: function(){
        var promise = $.Deferred();
        var logger = window.InfinniUI.global.logger;

        if(this.get('isRequestInProcess')){
            this.once('onPropertyChanged:', function(){
                if(this.isDataReady()){
                    promise.resolve();
                }else{
                    logger.warn({
                        message: 'BaseDataSource: strange, expected other dataReady status',
                        source: this
                    });
                }
            });
        }else{
            promise.resolve();
        }

        return promise;
    },

    setBindingBuilder: function(bindingBuilder){
        this.set('bindingBuilder', bindingBuilder);
    },

    _replaceAllProperties: function (currentObject, newPropertiesSet) {
        for (var property in currentObject) {
            delete(currentObject[property]);
        }

        for (var property in newPropertiesSet) {
            currentObject[property] = newPropertiesSet[property];
        }
    },

    _copyObject: function (currentObject) {
        return JSON.parse(JSON.stringify(currentObject));
    },

    _getArgumentTemplate: function () {
        return {
            source: this
        };
    }

});

_.extend(BaseDataSource.prototype, dataSourceFileProviderMixin);