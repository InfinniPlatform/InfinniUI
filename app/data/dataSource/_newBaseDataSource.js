/**
 * @constructor
 * @augments Backbone.Model
 * @mixes dataSourceFileProviderMixin, dataSourceFindItemMixin
 */
var newBaseDataSource = Backbone.Model.extend({
    defaults: {
        name: null,
        idProperty: 'Id',

        view: null,

        isDataReady: false,

        dataProvider: null,

        /*
        * TreeModel
        * model.urlParams
        * model.urlParams.get, post, delete
        * model.urlParams...origin
        * model.urlParams...path
        * model.urlParams...query
        * model.urlParams...data
        * model.items
        * model.selectedItem
        * */
        model: null,

        modifiedItems: {},
        itemsById: {},

        fillCreatedItem: true,

        suspendingList: null, // []

        errorValidator: null,
        warningValidator: null,
        showingWarnings: false,

        isRequestInProcess: false,

        isLazy: true,

        isNumRegEx: /^\d/

    },

    initialize: function () {
        var view = this.get('view');
        var modelStartTree = {
            urlParams: {
                get: {
                    origin: '',
                    path: '',
                    query: '',
                    data: ''
                },

                post: {
                    origin: '',
                    path: '',
                    query: '',
                    data: ''
                },

                delete: {
                    origin: '',
                    path: '',
                    query: '',
                    data: ''
                }
            },
            items: null,
            selectedItem: null
        };

        this.initDataProvider();
        if (!view) {
            throw 'BaseDataSource.initialize: При создании объекта не была задана view.'
        }
        this.set('suspended', []);
        this.set('model', new TreeModel(view.getContext(), this, modelStartTree));
    },

    initDataProvider: function () {
        throw 'BaseDataSource.initDataProvider В потомке BaseDataSource не задан провайдер данных.'
    },

    onError: function (handler) {
        this.on('error', handler);
    },

    onPropertyChanged: function (property, handler, owner) {

        if (typeof property == 'function') {
            owner = handler;
            handler = property;
        }

        if(property.charAt(0) == '.'){
            property = property.substr(1);
        }else{
            property = 'items.' + property;
        }

        this.get('model').onPropertyChanged(property, handler, owner);
    },

    onSelectedItemChanged: function (handler, owner) {
        this.get('model').onPropertyChanged('selectedItem', handler, owner);
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
                this.get('model').setProperty(property, value);
            }

        }else{
            if(firstChar == '.'){
                property = property.substr(1);
                this.get('model').setProperty(property, value);

            }else if(this.get('isNumRegEx').test(firstChar)){
                property = 'items.' + property;
                this.get('model').setProperty(property, value);

            }else{
                indexOfSelectedItem = this._indexOfSelectedItem();
                if(indexOfSelectedItem == -1){
                    return;
                }
                property = 'items.' + indexOfSelectedItem + '.' + property;
                this.get('model').setProperty(property, value);
            }
        }

        // если один элемент - и это номер или доллар - _changeItem(index, value) замена содержимого item

        // если пусто - _setItems(value, 'calledFromSetProperty')

        // если . - сеттим в обычное свойство

        // если номер и точка -

        // иначе - setSelectedItemValue(value)


        //-----------

        /*var selectedItem = this.getSelectedItem(),
            bindingByIndexRegEx = /^\d/,
            relativeProperty, oldValue, source;

        if (property == '') {
            oldValue = this.get('items');
            this._setItems(value);

        } else if (property == '$') {

            if (!selectedItem) {
                return;
            }

            if (value != selectedItem) {
                oldValue = this._copyObject(selectedItem);
                this._replaceAllProperties(selectedItem, value);
            } else {
                return;
            }

        } else {

            if (!selectedItem) {
                return;
            }

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
        this._notifyAboutPropertyChanged(property, value, oldValue);*/
    },

    _setItems: function (items) {
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

        this._notifyAboutItemsUpdatedAsPropertyChanged(items);
        //this.trigger('settingNewItemsComplete');
    },

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

        this.get('model').setProperty('selectedItem', item);

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

    suspendUpdate: function (name) {
        var reason = name || 'default';

        var suspended = this.get('suspended');
        if (suspended.indexOf(reason) === -1) {
            suspended = suspended.slice(0);
            suspended.push(reason);
            this.set('suspended', suspended);
        }
    },

    resumeUpdate: function (name) {
        var reason = name || 'default';

        var suspended = this.get('suspended');
        var index = suspended.indexOf(reason);

        if (index !== -1) {
            suspended = suspended.slice(0);
            suspended.splice(index, 1);
            this.set('suspended', suspended);
        }
    },

    isUpdateSuspended: function () {
        var suspended = this.get('suspended');
        return suspended.length > 0;
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
        var pageSize = parseInt(value, 10);
        if (!Number.isInteger(pageSize) || pageSize < 0) {
            throw 'BaseDataSource.setPageSize() Заданно недопустимое значение: ' + pageSize + '. Должно быть целое, неотрицательное число.';
        }

        if (pageSize != this.get('pageSize')) {
            this.set('pageSize', pageSize);
            this.updateItems();
        }
    },

    getSorting: function () {
        return this.get('sorting');
    },

    setSorting: function (sortingValue) {
        this.set('sorting', sortingValue);
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

        this._replaceAllProperties(oldValue, item);
        this._replaceAllProperties(item, value);

        this.get('model').simulateSetProperty('items.'+index, oldValue);
    },
    // UNUSED?
    //prepareAndGetProperty: function(property, onReady){
    //    var that = this;
    //
    //    if (this.get('isDataReady')){
    //        onReady( this.getProperty(property) );
    //    }else{
    //        if (!this.get('isRequestInProcess')){
    //            this.updateItems();
    //        }
    //
    //        this.once('onItemsUpdated', function(){
    //            onReady( that.getProperty(property) );
    //        });
    //    }
    //},

    tryInitData: function(){
        if (!this.get('isDataReady') && !this.get('isRequestInProcess')){
            this.updateItems();
        }
    },

    _notifyAboutPropertyChanged: function (property, newValue, oldValue) {
        var
            ds = this,
            context = this.getContext(),
            argument = this._getArgumentTemplate(),
            selectedItem = ds.getSelectedItem(),
            items = ds.getItems(),
            selectedItemIndex = items.indexOf(selectedItem);

        argument.property = property;
        argument.newValue = newValue;
        argument.oldValue = oldValue;

        this.trigger('onPropertyChanged', context, argument);

        /**
         * Генерация событий на обновление связанных полей ($ и Значения вложенных полей)
         */
        this._onPropertyChangesList
            .filter(function (name) {
                if(typeof name != 'string'){
                    return false;
                }

                var prop, matched = false;
                var template = property + '.';
                if (property === name) {
                    matched = false;
                } else if (property.length && name.length){
                    if (isBindToSelectedItem(name) && isBindToSelectedItem(property)) {
                        if (name.indexOf(template) === 0) {
                            matched = true;
                        }
                    } else  if (isBindToSelectedItem(name)) {
                        prop = resolveProperty(name);
                        if (prop.indexOf(template) === 0) {
                            matched = true;
                        }
                    } else if (isBindToSelectedItem(property)) {
                        prop = resolveProperty(property);
                        if (name.indexOf(template) === 0) {
                            matched = true;
                        }
                    }
                }

                return matched;
            })
            .map(function (name) {
                var prop,
                    argument = ds._getArgumentTemplate();

                argument.property = name;

                if(isBindToSelectedItem(name)) {
                    var prop1 = resolveProperty(name),
                        prop2 = resolveProperty(property);

                    prop = prop1.substr(prop2.length);
                } else {
                    prop = name.substr(property.length);
                }

                prop = prop.replace(/^\.+/, '');

                argument.newValue = InfinniUI.ObjectUtils.getPropertyValue(newValue, prop);
                argument.oldValue = InfinniUI.ObjectUtils.getPropertyValue(oldValue, prop);

                return argument
            })
            .forEach(function (argument) {
                ds.trigger('onPropertyChanged:' + argument.property, context, argument);
            });

        argument.property = property;
        this.trigger('onPropertyChanged:' + property, context, argument);

        function resolveProperty () {

        }
        function resolveProperty(property) {
            return property.replace(/^\$/, selectedItemIndex);
        }

        function  isBindToSelectedItem(property) {
            return /^\$/.test(property);
        }


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



        if (typeof success === 'function') {
            var context = this.getContext(),
                argument = this._getArgumentTemplate();

            success.call(null, context, argument);
        }
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

        if ( item == null || ( itemId !== undefined && !isItemInSet ) ) {
            this._notifyAboutMissingDeletedItem(item, error);
            return;
        }

        dataProvider.deleteItem(item, function (data) {
            if (!('IsValid' in data) || data['IsValid'] === true) {
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

        this._notifyAboutValidation(errorData, errorHandler);
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
                that._handleUpdatedItemsData(data, onSuccess);

            }, onError);
        }

    },

    _handleUpdatedItemsData: function (itemsData, successHandler) {
        this.setProperty('', itemsData.data);
        this._notifyAboutItemsUpdated(itemsData, successHandler);
    },

    _notifyAboutItemsUpdated: function (itemsData, successHandler) {
        var context = this.getContext(),
            argument = {
                value: itemsData.data
            };

        if (successHandler) {
            successHandler(context, argument);
        }
        //this.trigger('onItemsUpdated', context, argument); сделать в _setItems
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
        if (!this.isUpdateSuspended()) {
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

    addFilter: function (value) {
        var filterManager = this.getFilterManager();
        filterManager.addFilter(value);
    },

    setFilter: function (value, onSuccess, onError) {
        var filterManager = this.getFilterManager();
        var filter = _.clone(value);

        filterManager.clean();

        filterManager.onChange(function(newCriteriaList){
            if(filterManager.isReady()){
                this._setCriteriaList(newCriteriaList, onSuccess, onError);
            }
        }.bind(this));
        filterManager.addFilter(filter);
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

    _notifyAboutValidation: function (validationResult, validationHandler) {
        var context = this.getContext(),
            argument = {
                value: validationResult
            };

        if (validationHandler) {
            validationHandler(context, argument);
        }
        this.trigger('onErrorValidator', context, argument);

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
    }

});
