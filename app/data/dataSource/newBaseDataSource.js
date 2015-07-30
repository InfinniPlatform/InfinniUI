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

        modifiedItems: [],
        items: null,
        itemsById: {},
        selectedItem: null,
        stringifySelectedItem: null,

        fillCreatedItem: true,
        isUpdateSuspended: false,
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
        this.set('items', items);
        this.set('isDataReady', true);
        this.set('modifiedItems', []);
        if(items && items.length > 0){
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
                    throw 'BaseDataSource.setSelectedItem() Попытка выбрать элемент которого не из списка элементов';
                }else{
                    error(this.getContext(), {error: 'BaseDataSource.setSelectedItem() Попытка выбрать элемент которого не из списка элементов'});
                }
            }
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
            return this.get('modifiedItems').length > 0;
        }

        if (item != null && item !== undefined) {
            return false;
        }
        else {
            var index = this.get('modifiedItems').indexOf(item);
            return index != -1;
        }
    },

    setProperty: function(property, value){
        var selectedItem = this.getSelectedItem(),
            relativeProperty;

        if(!selectedItem){
            return;
        }

        if(property != '$'){
            if(property.substr(0,2) == '$.'){
                relativeProperty = property.substr(0,2);
            }else{
                relativeProperty = property;
            }

            InfinniUI.ObjectUtils.setPropertyValue(selectedItem, relativeProperty, value);
        }else{

        }
    },

    saveItem : function (item, onSuccess) {

    },

    isDataReady: function(){
        return this.get('isDataReady');
    },

    getItems: function(){
        if(this.isDataReady()){
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

        successHandler(context, argument);
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

        successHandler(context, argument);
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

    getContext: function(){
        return this.getView().getContext();
    }

});
