var BaseDataSource = Backbone.Model.extend({
    defaults: {
        name: null,
        idProperty: 'Id',
        pageNumber: null,
        pageSize: 15,
        sorting: null,
        criteriaList: [],

        isDataReady: false,

        dataProvider: null,

        modifiedItems: [],
        items: null,
        selectedItem: null,
        stringifySelectedItem: null,

        fillCreatedItem: true,
        isUpdateSuspended: false,
        showingWarnings: false

    },

    initialize: function(){
        this.initDataProvider();
    },

    initDataProvider: function(){
        throw 'BaseDataSource.initDataProvider ¬ потомке BaseDataSource не задан провайдер данных.'
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

    getName: function(){
        return this.get('name');
    },

    setName: function(name){
        this.set('name', name);
    },

    getIdProperty: function () {
        return this.get('idProperty');
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
        this.updateItems();
    },

    getPageNumber: function () {
        return this.get('pageNumber');
    },

    setPageNumber: function (value) {
        if(Number.isInteger(value) || value < 0){
            throw 'BaseDataSource.setPageNumber() «аданно недопустимое значение: ' + value + '. ƒолжно быть целое, неотрицательное число.';
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
        if(Number.isInteger(value) || value < 0){
            throw 'BaseDataSource.setPageSize() «аданно недопустимое значение: ' + value + '. ƒолжно быть целое, неотрицательное число.';
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

    saveItem : function (item, onSuccess) {

    },


    _updateLocalItems: function(warnings){

    },

    isDataReady: function(){
        return this.get('isDataReady');
    },

    getItems: function(){
        if(this.isDataReady()){
            logger.warn({
                message: 'BaseDataSource: ѕопытка получить данные источника данных (' + this.get('name') + '), до того как он был проинициализирован данными',
                source: this
            });
        }

        return this.get('items');
    },

    isDataReady: function(){
        return this.get('isDataReady');
    },

    updateItems: function(onSuccess, onError){
        var filters = this.getFilter(),
            pageNumber = this.get('pageNumber'),
            pageSize = this.get('pageSize'),
            sorting = this.get('sorting');

        this.get('dataProvider')
            .getItems( filters, pageNumber, pageSize, sorting, onSuccess, onError );
    },

    getFilter: function(){
        this.get('criteriaList');
    }


});
