/**
 * @constructor
 * @augments Backbone.Model
 * @mixes dataSourceFileProviderMixin, dataSourceFindItemMixin
 */
var BaseDataSource = Backbone.Model.extend({
    defaults: {
        name: null,
        idProperty: '_id',
        identifyingMode: 'byId', // byId, byLink. detect automatically

        view: null,

        isDataReady: false,

        dataProvider: null,

        /*
         * TreeModel for handling
         * model.items
         * model.selectedItem
         * */
        model: null,

        modifiedItems: {},
        itemsById: {},

        fillCreatedItem: true,

        suspendingList: null, // []

        waitingOnUpdateItemsHandlers: null, //[]

        errorValidator: null,
        warningValidator: null,
        showingWarnings: false,

        isRequestInProcess: false,

        isLazy: true,

        newItemsHandler: null,

        isNumRegEx: /^\d/

    },

    initialize: function () {
        var view = this.get('view');
        var modelStartTree = {
            items: null,
            selectedItem: null
        };

        this.initDataProvider();
        if (!view) {
            throw 'BaseDataSource.initialize: При создании объекта не была задана view.'
        }
        this.set('suspendingList', []);
        this.set('waitingOnUpdateItemsHandlers', []);
        this.set('model', new TreeModel(view.getContext(), this, modelStartTree));
    },

    initDataProvider: function () {
        throw 'BaseDataSource.initDataProvider В потомке BaseDataSource не задан провайдер данных.'
    },

    onPropertyChanged: function (property, handler, owner) {

        if (typeof property == 'function') {
            owner = handler;
            handler = property;
            property = '*';
        }

        if(property.charAt(0) == '.'){
            property = property.substr(1);
        }else{
            if(property == ''){
                property = 'items';
            }else{
                property = 'items.' + property;
            }

        }

        this.get('model').onPropertyChanged(property, function(context, args){
            var property = args.property;

            if(property.substr(0,6) == 'items.'){
                property = property.substr(6);
            }else if(property == 'items'){
                property = '';
            } else{
                property = '.' + property;
            }

            args.property = property;

            handler(context, args);
        }, owner);
    },

    onSelectedItemChanged: function (handler, owner) {
        var that = this;

        this.get('model').onPropertyChanged('selectedItem', function(context, args){
            var argument = that._getArgumentTemplate();
            argument.value = args.newValue;

            handler(context, argument);
        }, owner);
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

    getProperty: function (property) {
        var firstChar = property.charAt(0);
        var indexOfSelectedItem;

        if( this.get('isNumRegEx').test(firstChar) ){
            property = 'items.' + property;

        }else if(firstChar == ''){
            property = 'items';

        }else if(firstChar == '$'){
            indexOfSelectedItem = this._indexOfSelectedItem();
            if(indexOfSelectedItem == -1){
                return undefined;
            }
            property = 'items.' + indexOfSelectedItem + property.substr(1);

        }else if(firstChar == '.'){
            property = property.substr(1);
        }else{
            indexOfSelectedItem = this._indexOfSelectedItem();
            if(indexOfSelectedItem == -1){
                return undefined;
            }
            property = 'items.' + indexOfSelectedItem + '.' + property;
        }

        return this.get('model').getProperty(property);
    },

    setProperty: function (property, value) {
        var propertyPaths = property.split('.');
        var firstChar;
        var indexOfSelectedItem;
        var index;
        var resultOfSet;

        if(propertyPaths[0] == '$'){
            indexOfSelectedItem = this._indexOfSelectedItem();
            if(indexOfSelectedItem == -1){
                return;
            }

            property = indexOfSelectedItem + property.substr(1);
            propertyPaths[0] = indexOfSelectedItem.toString();
        }

        firstChar = property.charAt(0);

        if(propertyPaths.length == 1){

            if(propertyPaths[0] == ''){
                this._setItems(value);

            }else if( this.get('isNumRegEx').test(propertyPaths[0]) ){
                this._changeItem(propertyPaths[0], value);

            }else{
                indexOfSelectedItem = this._indexOfSelectedItem();
                if(indexOfSelectedItem == -1){
                    return;
                }
                property = 'items.' + indexOfSelectedItem + '.' + property;
                resultOfSet = this.get('model').setProperty(property, value);

                if(resultOfSet){
                    this._includeItemToModifiedSetByIndex(indexOfSelectedItem);
                }
            }

        }else{
            if(firstChar == '.'){
                property = property.substr(1);
                this.get('model').setProperty(property, value);

            }else if(this.get('isNumRegEx').test(firstChar)){
                property = 'items.' + property;
                resultOfSet = this.get('model').setProperty(property, value);

                if(resultOfSet){
                    this._includeItemToModifiedSetByIndex( parseInt(propertyPaths[0]));
                }
            }else{
                indexOfSelectedItem = this._indexOfSelectedItem();
                if(indexOfSelectedItem == -1){
                    return;
                }
                property = 'items.' + indexOfSelectedItem + '.' + property;
                resultOfSet = this.get('model').setProperty(property, value);

                if(resultOfSet){
                    this._includeItemToModifiedSetByIndex(indexOfSelectedItem);
                }
            }
        }
    },

    _setItems: function (items) {
        this._detectIdentifyingMode(items);

        var indexOfItemsById;

        this.set('isDataReady', true);
        this.get('model').setProperty('items', items);
        this._clearModifiedSet();
        if (items && items.length > 0) {
            indexOfItemsById = this._indexItemsById(items);
            this.set('itemsById', indexOfItemsById);

            if( !this._restoreSelectedItem() ){
                this.setSelectedItem(items[0]);
            }

        } else {
            this.setSelectedItem(null);
        }
    },

    _restoreSelectedItem: function(){
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn({
            message: 'BaseDataSource._restoreSelectedItem: not overrided by strategy',
            source: this
        });
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
        return this.get('model').getProperty('selectedItem');
    },

    setSelectedItem: function (item, success, error) {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn({
            message: 'BaseDataSource.setSelectedItem: not overrided by strategy',
            source: this
        });
    },

    _notifyAboutSelectedItem: function (item, successHandler) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;

        if (successHandler) {
            successHandler(context, argument);
        }
    },

    _tuneMirroringOfModel: function(index){
        if(index != -1){
            this.get('model').setMirroring('items.$', 'items.'+index);
        }else{
            this.get('model').setMirroring(null, null);
        }
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

    suspendUpdate: function (name) {
        var reason = name || 'default';

        var suspended = this.get('suspendingList');
        if (suspended.indexOf(reason) === -1) {
            suspended = suspended.slice(0);
            suspended.push(reason);
            this.set('suspendingList', suspended);
        }
    },

    resumeUpdate: function (name) {
        var reason = name || 'default';

        var suspended = this.get('suspendingList');
        var index = suspended.indexOf(reason);

        if (index !== -1) {
            suspended = suspended.slice(0);
            suspended.splice(index, 1);
            this.set('suspendingList', suspended);

            // если источник полностью разморожен, а до этого вызывались updateItems, не выполненные из-за заморозки, нужно вызвать updateItems
            if(!this.isUpdateSuspended() && this.get('waitingOnUpdateItemsHandlers').length > 0){
                this.updateItems();
            }
        }
    },

    isUpdateSuspended: function () {
        var suspended = this.get('suspendingList');
        return suspended.length > 0;
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

    _includeItemToModifiedSetByIndex: function (index) {
        var item;

        item = this.getItems()[index];
        this._includeItemToModifiedSet(item);
    },

    _includeItemToModifiedSet: function (item) {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn({
            message: 'BaseDataSource._includeItemToModifiedSet: not overrided by strategy',
            source: this
        });
    },

    _excludeItemFromModifiedSet: function (item) {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn({
            message: 'BaseDataSource._excludeItemFromModifiedSet: not overrided by strategy',
            source: this
        });
    },

    _clearModifiedSet: function () {
        this.set('modifiedItems', {});
    },

    /**
     * @description Проверяет формат имя свойства атрибута
     * @param propertyName
     * @private
     */
    _checkPropertyName: function (propertyName) {
        var result = true;
        try {
            if (propertyName && propertyName.length > 0) {
                result = propertyName.match(/^[\$#@\d]+/);
            }
            if (!result) {
                throw new Error('Wrong property name "' + propertyName + '"');
            }
        } catch (e) {
            console.debug(e);
        }
    },

    _changeItem: function(index, value){
        var item = this.get('model').getProperty('items.'+index);
        var oldValue = {};

        if(value == item){
            return;
        }

        this._excludeItemFromModifiedSet(item);

        this._replaceAllProperties(oldValue, item);
        this._replaceAllProperties(item, value);

        this.get('model').simulateSetProperty('items.'+index, oldValue);

        this._includeItemToModifiedSet(item);
    },

    tryInitData: function(){
        if (!this.get('isDataReady') && !this.get('isRequestInProcess')){
            this.updateItems();
        }
    },

    saveItem: function (item, success, error) {
        var dataProvider = this.get('dataProvider'),
            ds = this,
            logger = window.InfinniUI.global.logger,
            that = this,
            validateResult;

        if (!this.isModified(item)) {
            this._notifyAboutItemSaved({item: item, result: null}, 'notModified');
            that._executeCallback(success, {item: item, result: {IsValid: true}});
            return;
        }

        validateResult = this.validateOnErrors(item);
        if (!validateResult.IsValid) {
            that._notifyAboutValidation(validateResult, 'error');
            this._executeCallback(error, {item: item, result: validateResult});
            return;
        }

        dataProvider.saveItem(item, function(data){
            if( !('IsValid' in data) || data.IsValid === true ){
                that._excludeItemFromModifiedSet(item);
                that._notifyAboutItemSaved({item: item, result: data.data}, 'modified');
                that._executeCallback(success, {item: item, result: that._getValidationResult(data)});
            }else{
                var result = that._getValidationResult(data);
                that._notifyAboutValidation(result, 'error');
                that._executeCallback(error, {item: item, result: result});
            }
        }, function(data) {
            var result = that._getValidationResult(data);
            that._notifyAboutValidation(result, 'error');
            that._executeCallback(error, {item: item, result: result});
        });
    },

    _getValidationResult: function(data){
        if(data.data && data.data.responseJSON && data.data.responseJSON['Result']){
            return data.data.responseJSON['Result']['ValidationResult'];
        }
        
        return data.data && data.data['Result'] && data.data['Result']['ValidationResult'];
    },

    _executeCallback: function(callback, args){
        if(callback){
            callback(this.getContext(), args);
        }
    },

    _notifyAboutItemSaved: function (data, result) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = data;
        argument.result = result;

        this.trigger('onItemSaved', context, argument);
    },

    deleteItem: function (item, success, error) {
        var dataProvider = this.get('dataProvider'),
            that = this,
            itemId = this.idOfItem(item),
            isItemInSet = this.get('itemsById')[itemId] !== undefined;

        if ( item == null || ( itemId !== undefined && !isItemInSet ) ) {
            this._notifyAboutMissingDeletedItem(item, error);
            return;
        }

        this.beforeDeleteItem(item);
        dataProvider.deleteItem(item, function (data) {
            if (!('IsValid' in data) || data['IsValid'] === true) {
                that._handleDeletedItem(item, success);
            } else {
                var result = that._getValidationResult(data);
                that._notifyAboutValidation(result, 'error');
                that._executeCallback(error, {item: item, result: result});
            }
        }, function(data) {
            var result = that._getValidationResult(data);
            that._notifyAboutValidation(result, 'error');
            that._executeCallback(error, {item: item, result: result});
        });
    },

    beforeDeleteItem: function(item){},

    _handleDeletedItem: function (item, successHandler) {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn({
            message: 'BaseDataSource._handleDeletedItem: not overrided by strategy',
            source: this
        });
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

        return this.get('model').getProperty('items');
    },

    updateItems: function (onSuccess, onError) {
        if (!this.isUpdateSuspended()) {
            var dataProvider = this.get('dataProvider'),
                that = this;

            this.set('isRequestInProcess', true);
            dataProvider.getItems(function (data) {

                that.set('isRequestInProcess', false);
                that._handleUpdatedItemsData(data.data, onSuccess, onError);

            }, onError);
        }else{
            var handlers = this.get('waitingOnUpdateItemsHandlers');
            handlers.push({
                onSuccess: onSuccess,
                onError: onError
            });
        }

    },

    _handleUpdatedItemsData: function (itemsData, successHandler, errorHandler) {
        if(this.get('newItemsHandler')){
            itemsData = this.get('newItemsHandler')(itemsData);
        }

        this.setProperty('', itemsData);
        this._notifyAboutItemsUpdated(itemsData, successHandler, errorHandler);
    },

    _notifyAboutItemsUpdated: function (itemsData, successHandler, errorHandler) {
        var context = this.getContext();
        var argument = {
            value: itemsData,
            source: this
        };

        // вызываем обработчики которые были переданы на отложенных updateItems (из за замороженного источника)
        var handlers = this.get('waitingOnUpdateItemsHandlers');
        for(var i = 0, ii = handlers.length; i < ii; i++){
            if(handlers[i].onSuccess){
                handlers[i].onSuccess(context, argument);
            }
        }

        this.set('waitingOnUpdateItemsHandlers', []);

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
        var items = this.getItems();

        if(items) {
            items = items.slice();
            items.push(itemData);
        }else{
            items = [itemData];
        }

        this.setProperty('', items);
        this._includeItemToModifiedSet(itemData);
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
    },

    setFilter: function (value, onSuccess, onError) {
    },

    _setCriteriaList: function(criteriaList, onSuccess, onError){
        this.set('criteriaList', criteriaList);
        this.updateItems(onSuccess, onError);
    },

    setIdFilter: function (itemId) {
        var dataProvider = this.get('dataProvider'),
            idFilter = dataProvider.createIdFilter(itemId);

        this.setFilter(idFilter);
    },

    setNewItemsHandler: function(handler){
        this.set('newItemsHandler', handler);
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

    setFileProvider: function (fileProvider) {
        this.set('fileProvider', fileProvider);
    },

    getFileProvider: function () {
        return this.get('fileProvider');
    },

    _validatingActions: function (item, callback, validationType) {
        var validatingFunction = validationType == 'error' ? this.get('errorValidator') : this.get('warningValidator'),
            result = {
                IsValid: true,
                Items: []
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
                    if (!subResult.IsValid) {
                        this._addIndexToPropertiesOfValidationMessage(subResult.Items, i);
                        result.IsValid = false;
                        result.Items = _.union(result.Items, subResult.Items);
                    }

                }

            }
        }

        this._notifyAboutValidation(result, validationType);
        this._executeCallback(callback, {item: item, result: result});

        return result;
    },

    _addIndexToPropertiesOfValidationMessage: function (validationMessages, index) {
        for (var i = 0, ii = validationMessages.length; i < ii; i++) {
            validationMessages[i].property = index + '.' + validationMessages[i].property;
        }
    },

    _notifyAboutValidation: function (validationResult, validationType) {
        var context = this.getContext(),
            argument = {
                value: validationResult
            };

        var eventType = (validationType == 'warning') ? 'onWarningValidator' : 'onErrorValidator';
        this.trigger(eventType, context, argument);
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

    _indexOfItem: function(item){
        var items = this.getItems();
        if(!items){
            return -1;
        }
        return items.indexOf(item);
    },

    _indexOfSelectedItem: function(){
        var selectedItem = this.getSelectedItem();

        return this._indexOfItem(selectedItem);
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
            this.once('onItemsUpdated', function(){
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

    getNearestRequestPromise: function(){
        var promise = $.Deferred();

        this.once('onItemsUpdated', function(){
            if(this.isDataReady()){
                promise.resolve();
            }else{
                logger.warn({
                    message: 'BaseDataSource: strange, expected other dataReady status',
                    source: this
                });
            }
        });

        return promise;
    },

    //setBindingBuilder: function(bindingBuilder){
    //    this.set('bindingBuilder', bindingBuilder);
    //},

    setIsLazy: function(isLazy){
        this.set('isLazy', isLazy);
    },

    isLazy: function(){
        return this.get('isLazy');
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
    },

    _detectIdentifyingMode: function(items){
        if( $.isArray(items) && items.length > 0){
            if( !$.isPlainObject(items[0]) || this.getIdProperty() in items[0] ){
                this.set('identifyingMode', 'byId');
                _.extend( this, BaseDataSource.identifyingStrategy.byId);
            }else{
                this.set('identifyingMode', 'byLink');
                _.extend( this, BaseDataSource.identifyingStrategy.byLink);
            }
        }else{
            this.set('identifyingMode', 'byId');
            _.extend( this, BaseDataSource.identifyingStrategy.byId);
        }
    },

    _getIdentifyingMode: function(){
        return this.get('identifyingMode');
    }

});


BaseDataSource.identifyingStrategy = {

    byId: {
        _restoreSelectedItem: function(){

            var selectedItem = this.getSelectedItem(),
                selectedItemId = this.idOfItem(selectedItem);

            if( selectedItemId != null ){
                var items = this.get('itemsById');
                var newSelectedItem = items[selectedItemId];

                if( newSelectedItem != null ){
                    this.setSelectedItem(newSelectedItem);
                    return true;
                }
            }

            return false;
        },

        setSelectedItem: function (item, success, error) {
            var currentSelectedItem = this.getSelectedItem(),
                items = this.get('itemsById'),
                itemId = this.idOfItem(item),
                index;


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

            this.get('model').setProperty('selectedItem', item);

            index = this._indexOfItem(items[itemId]);
            this._tuneMirroringOfModel(index);

            this._notifyAboutSelectedItem(item, success);
        },

        _includeItemToModifiedSet: function (item) {
            var itemId = this.idOfItem(item);
            this.get('modifiedItems')[itemId] = item;
        },

        _excludeItemFromModifiedSet: function (item) {
            var itemId = this.idOfItem(item);
            delete this.get('modifiedItems')[itemId];
        },

        _handleDeletedItem: function (item, successHandler) {
            var items = this.getItems(),
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
        }
    },

    byLink: {
        _restoreSelectedItem: function(){

            var selectedItem = this.getSelectedItem();
            var items = this.getItems();

            if( items.indexOf(selectedItem) == -1 ){
                return false;
            }else{
                return true;
            }
        },

        setSelectedItem: function (item, success, error) {
            var currentSelectedItem = this.getSelectedItem(),
                items = this.getItems(),
                index = this._indexOfItem(item);


            if (typeof item == 'undefined') {
                item = null;
            }

            if (item == currentSelectedItem) {
                return;
            }

            if (item !== null) {
                if (index == -1) {
                    if (!error) {
                        throw 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.';
                    } else {
                        error(this.getContext(), {error: 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.'});
                        return;
                    }
                }
            }

            this.get('model').setProperty('selectedItem', item);

            this._tuneMirroringOfModel(index);

            this._notifyAboutSelectedItem(item, success);
        },

        _includeItemToModifiedSet: function (item) {
            this.get('modifiedItems')['-'] = item;
        },

        _excludeItemFromModifiedSet: function (item) {
            delete this.get('modifiedItems')['-'];
        },

        _handleDeletedItem: function (item, successHandler) {
            var items = this.getItems(),
                selectedItem = this.getSelectedItem(),
                index = items.indexOf(item);

            if(index >= 0){
                items.splice(index, 1);
                this._excludeItemFromModifiedSet(item);

                if (selectedItem && selectedItem == item) {
                    this.setSelectedItem(null);
                }
            }

            this._notifyAboutItemDeleted(item, successHandler);
        }
    }
};

_.extend(BaseDataSource.prototype, dataSourceFileProviderMixin);