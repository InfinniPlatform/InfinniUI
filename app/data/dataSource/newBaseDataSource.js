var BaseDataSource = Backbone.Model.extend({
    defaults: {
        name: null,
        dataProvider: null,
        idProperty: 'Id',
        fillCreatedItem: true,
        isUpdateSuspended: false,
        pageNumber: null,
        pageSize: 15,
        modifiedItems: [],
        items: null
    },

    initialize: function(){
        this.initDataProvider();
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
        if(Number.isInteger(value) || value < 0){
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

    saveItem : function (item, onSuccess) {
        this.get('dataProvider').replaceItem(item, warnings, function (data) {
            var idProperty = this.get('idProperty');

            if ((data.IsValid === false) ) {

                this.trigger('error', data.ValidationMessage);

            } else {

                if(!(data instanceof Array) && item != null) {
                    item[idProperty] = data.InstanceId;
                    this.set('items', [item]);
                    currentStrategy.onItemSaved(item, data);
                    resetModified(item);
                }

                if (onSuccess) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    onSuccess.apply(undefined, args);
                }

            }
        });
    },


    _updateLocalItems: function(warnings){

    }


});