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

        isRequestInProcess: false

    },

    initialize: function(){
        this.initDataProvider();

        if(!this.get('view')){
            throw 'BaseDataSource.initialize: При создании объекта не была задана view.'
        }
    },

    initDataProvider: function(){
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

    onPropertyChanged: function (handler) {
        this.on('onPropertyChanged', handler);
    },

    onSelectedItemChanged: function (handler) {
        this.on('onSelectedItemChanged', handler);
    },

    onItemCreated: function (handler) {
        this.on('onItemCreated', handler);
    },

    onItemsUpdated: function (handler) {
        this.on('onItemsUpdated', handler);
    },

    getName: function(){
        return this.get('name');
    },

    setName: function(name){
        this.set('name', name);
    },

    getView: function(){
        return this.get('view');
    },

    getItems: function(){
        return this.get('items');
    },

    _setItems: function(items){
        var indexOfItemsById;

        this.set('isDataReady', true);
        this.set('items', items);
        this._clearModifiedSet();
        if(items && items.length > 0){
            indexOfItemsById = this._indexItemsById(items);
            this.set('itemsById', indexOfItemsById);

            this.setSelectedItem(items[0]);
        }else{
            this.setSelectedItem(null);
        }
    },

    getSelectedItem: function(){
        return this.get('selectedItem');
    },

    setSelectedItem: function(item, success, error){
        var currentSelectedItem = this.getSelectedItem(),
            idProperty = this.get('idProperty'),
            items = this.get('itemsById'),
            itemId;

        if(item == currentSelectedItem){
            return;
        }

        if(item !== null){
            itemId = item[idProperty];

            if(!items[itemId]){
                if(!error){
                    throw 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.';
                }else{
                    error(this.getContext(), {error: 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.'});
                    return;
                }
            }
        }

        this.set('selectedItem', item);

        this._notifyAboutSelectedItem(item, success);
    },

    _notifyAboutSelectedItem: function(item, successHandler){
        var context = this.getContext(),
            argument = {
                value: item
            };

        if(successHandler){
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
        if(!Number.isInteger(value) || value < 0){
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
        if(!Number.isInteger(value) || value < 0){
            throw 'BaseDataSource.setPageSize() Заданно недопустимое значение: ' + value + '. Должно быть целое, неотрицательное число.';
        }

        if (value != this.get('pageSize')) {
            this.set('pageSize', value);
            this.updateItems();
        }
    },

    isModifiedItems : function () {
        return this.isModified();
    },

    isModified : function (item) {
        if(arguments.length == 0){
            return _.size(this.get('modifiedItems')) > 0;
        }

        if (item != null && item !== undefined) {
            return false;
        }
        else {
            var idProperty = this.get('idProperty'),
                itemId = item[idProperty];
            return itemId in this.get('modifiedItems');
        }
    },

    _includeItemToModifiedSet: function(item){
        var idProperty = this.get('idProperty'),
            itemId = item[idProperty];
        this.get('modifiedItems')[itemId] = item;
    },

    _excludeItemFromModifiedSet: function(item){
        var idProperty = this.get('idProperty'),
            itemId = item[idProperty];
        delete this.get('modifiedItems')[itemId];
    },

    _clearModifiedSet: function(){
        this.set('modifiedItems', {});
    },

    getProperty: function(property){
        var selectedItem = this.getSelectedItem(),
            relativeProperty, oldValue;

        if(!selectedItem){
            return undefined;
        }

        if(property != '$'){
            if(property.substr(0,2) == '$.'){
                relativeProperty = property.substr(2);
            }else{
                relativeProperty = property;
            }

            return InfinniUI.ObjectUtils.getPropertyValue(selectedItem, relativeProperty);
        }else{
            return selectedItem;
        }
    },

    setProperty: function(property, value){
        var selectedItem = this.getSelectedItem(),
            relativeProperty, oldValue;

        if(!selectedItem){
            return;
        }

        if(property != '$'){
            if(property.substr(0,2) == '$.'){
                relativeProperty = property.substr(2);
            }else{
                relativeProperty = property;
            }

            oldValue = InfinniUI.ObjectUtils.getPropertyValue(selectedItem, relativeProperty);
            if(value != oldValue){
                InfinniUI.ObjectUtils.setPropertyValue(selectedItem, relativeProperty, value);
            }else{
                return;
            }

        }else{
            if(value != selectedItem){
                oldValue = this._copyObject(selectedItem);
                this._replaceAllProperties(selectedItem, value);
            }else{
                return;
            }
        }

        this._includeItemToModifiedSet(selectedItem);
        this._notifyAboutPropertyChanged(property, value, oldValue);
    },

    _notifyAboutPropertyChanged : function (property, newValue, oldValue) {
        var context = this.getContext(),
            argument = {
                property: property,
                newValue: newValue,
                oldValue: oldValue
            };

        this.trigger('onPropertyChanged', context, argument);
    },

    saveItem : function (item, success, error) {
        var dataProvider = this.get('dataProvider'),
            that = this,
            validateResult;

        if(!this.isModified(item)){
            this._notifyAboutItemSaved(item, success);
            return;
        }

        validateResult = this.validateOnErrors(item);
        if(!validateResult.isValid){
            this._notifyAboutFailValidationBySaving(item, validateResult, error);
            return;
        }

        dataProvider.saveItem(item, function(data){
            if( !('isValid' in data) || data.isValid === true ){
                that._excludeItemFromModifiedSet(item);
                that._notifyAboutItemSaved(item, success);
            }else{
                that._notifyAboutFailValidationBySaving(item, data, error);
            }
        });
    },

    _notifyAboutItemSaved: function(item, successHandler){
        var context = this.getContext(),
            argument = {
                value: item
            };

        if(successHandler){
            successHandler(context, argument);
        }
        this.trigger('onItemsUpdated', context, argument);
    },

    _notifyAboutFailValidationBySaving: function(item, validationResult, errorHandler){
        this._notifyAboutValidation(validationResult, errorHandler, 'error');
    },

    isDataReady: function(){
        return this.get('isDataReady');
    },

    getItems: function(){
        if(!this.isDataReady()){
            logger.warn({
                message: 'BaseDataSource: Попытка получить данные источника данных (' + this.get('name') + '), до того как он был проинициализирован данными',
                source: this
            });
        }

        return this.get('items');
    },

    updateItems: function(onSuccess, onError){
        if (!this.get('isUpdateSuspended')){
            var filters = this.getFilter(),
                pageNumber = this.get('pageNumber'),
                pageSize = this.get('pageSize'),
                sorting = this.get('sorting'),
                dataProvider = this.get('dataProvider'),
                that = this;

            this.set('isRequestInProcess', true);
            dataProvider.getItems( filters, pageNumber, pageSize, sorting, function(data){

                that.set('isRequestInProcess', false);
                that._handleUpdatedItemsData(data, onSuccess);

            }, onError );
        }

    },

    _handleUpdatedItemsData: function(itemsData, successHandler){
        this._setItems(itemsData);
        this._notifyAboutItemsUpdated(itemsData, successHandler);
    },

    _notifyAboutItemsUpdated: function(itemsData, successHandler){
        var context = this.getContext(),
            argument = {
                value: itemsData
            };

        if(successHandler){
            successHandler(context, argument);
        }
        this.trigger('onItemsUpdated', context, argument);
    },

    createItem: function(success, error){
        var dataProvider = this.get('dataProvider'),
            idProperty = this.get('idProperty'),
            that = this,
            localItem;

        if(this.get('fillCreatedItem')){
            dataProvider.createItem(
                function (item) {
                    that._handleDataForCreatingItem(item, success);
                },
                idProperty
            );
        }else{
            localItem = dataProvider.createLocalItem(idProperty);
            this._handleDataForCreatingItem(localItem, success);
        }
    },

    _handleDataForCreatingItem: function(itemData, successHandler){
        this._setItems(itemData);
        this._notifyAboutItemCreated(itemData, successHandler);
    },

    _notifyAboutItemCreated: function(createdItem, successHandler){
        var context = this.getContext(),
            argument = {
                value: createdItem
            };

        if(successHandler){
            successHandler(context, argument);
        }
        this.trigger('onItemCreated', context, argument);
    },

    getFilter: function(){
        return this.get('criteriaList');
    },

    setFilter: function(filter){
        this.set('criteriaList', filter);
        this.updateItems();
    },

    setIdFilter: function(itemId){
        this.setFilter([{
            "Property": "Id",
            "Value": itemId,
            "CriteriaType": 1
        }]);
    },

    getErrorValidator: function(){
        return this.get('errorValidator');
    },

    setErrorValidator: function(validatingFunction){
        this.set('errorValidator', validatingFunction);
    },

    getWarningValidator: function(){
        return this.get('warningValidator');
    },

    setWarningValidator: function(validatingFunction){
        this.set('warningValidator', validatingFunction);
    },

    validateOnErrors: function(item, callback){
        return this._validatingActions(item, callback, 'error');
    },

    validateOnWarnings: function(item, callback){
        return this._validatingActions(item, callback, 'warning');
    },

    _validatingActions: function(item, callback, validationType){
        var validatingFunction = validationType == 'error' ? this.get('errorValidator') : this.get('warningValidator'),
            result = {
                isValid: true,
                items:[]
            },
            isCheckingOneItem = !!item,
            context = this.getContext(),
            items, subResult, itemIndex;

        if(validatingFunction){
            if(isCheckingOneItem){

                result = validatingFunction(context, item);

            }else{

                items = this.getItems();
                for(var i = 0, ii = items.length; i < ii; i++){

                    subResult = validatingFunction(context, items[i]);
                    if(!subResult.isValid) {
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

    _addIndexToPropertiesOfValidationMessage: function(validationMessages, index){
        for(var i = 0, ii = validationMessages.length; i < ii; i++){
            validationMessages[i].property = index + '.' + validationMessages[i].property;
        }
    },

    _notifyAboutValidation: function(validationResult, validationHandler, validationType){
        var context = this.getContext(),
            argument = {
                value: validationResult
            };

        if(validationHandler){
            validationHandler(context, argument);
        }

        if(validationType == 'error'){
            this.trigger('onErrorValidator', context, argument);
        }else{
            this.trigger('onWarningValidator', context, argument);
        }
    },

    getContext: function(){
        return this.getView().getContext();
    },

    _indexItemsById: function(items){
        var idProperty = this.get('idProperty'),
            result = {},
            idValue;
        for(var i = 0, ii = items.length; i < ii; i++){
            idValue = items[i][idProperty];
            result[idValue] = items[i];
        }

        return result;
    },

    _replaceAllProperties: function(currentObject, newPropertiesSet){
        for (var property in currentObject) {
            delete(currentObject[property]);
        }

        for (var property in newPropertiesSet) {
            currentObject[property] = newPropertiesSet[property];
        }
    },

    _copyObject: function(currentObject){
        return JSON.parse(JSON.stringify(currentObject));
    }

});
