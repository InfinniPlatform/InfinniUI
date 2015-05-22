var BaseDataSource = Backbone.Model.extend({
    defaults: {
        name: null,
        idProperty: 'Id',
        fillCreatedItem: true,
        isUpdateSuspended: false,
        pageNumber: null,
        pageSize: 15,
        modifiedItems: []
    },

    initialize: function(){

    },

    onPageNumberChanged: function (handler) {
        this.on('change:pageNumber', handler);
    },

    onPageNumberSize: function (handler) {
        this.on('change:pageSize', handler);
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
        return this.get('modifiedItems').length > 0;
    },

    isModified : function (item) {
        var isModified = value != null && value !== undefined;
        if (!isModified) {
            return false;
        }
        else {
            var index = modifiedItems.indexOf(value);
            return index > -1;
        }
    }


});