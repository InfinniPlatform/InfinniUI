var DocumentDataSource = RestDataSource.extend({
    defaults: _.defaults({
        documentId: null

    }, RestDataSource.prototype.defaults),

    initialize: function () {
        RestDataSource.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

        var model = this.get('model');
        model.setProperty('pageNumber', 0);
        model.setProperty('pageSize', 15);
        this.setUpdatingItemsConverter(function(data){
            model.setProperty('totalCount', data['Result']['Count']);
            model.setProperty('additionalResult', data['Result']['AdditionalResult']);
            return data['Result']['Items'];
        });

        this.initHandlers();
    },

    initHandlers: function(){
        BaseDataSource.prototype.initHandlers.apply(this, Array.prototype.slice.call(arguments));
        var model = this.get('model');
        var that = this;
        var updateGettingUrlParams = _.bind(this.updateGettingUrlParams, this);
        var updateGettingUrlParamsWithReset = _.bind(this.updateGettingUrlParamsWithReset, this);

        model.onPropertyChanged('documentId', function(){
            that.updateGettingUrlParams();
            that.updateSettingUrlParams();
            that.updateDeletingUrlParams();
        });

        model.onPropertyChanged('pageNumber', updateGettingUrlParams);
        model.onPropertyChanged('pageSize', updateGettingUrlParamsWithReset);

        model.onPropertyChanged('select', updateGettingUrlParams);
        model.onPropertyChanged('order', updateGettingUrlParamsWithReset);
        model.onPropertyChanged('needTotalCount', updateGettingUrlParams);

        this.updateGettingUrlParams();
        this.updateSettingUrlParams();
        this.updateDeletingUrlParams();
    },



    updateSettingUrlParams: function(){
        var model = this.get('model'),
            params = {
                method: 'post',
                origin: InfinniUI.config.serverUrl,
                path: '/documents/' + this.get('model').getProperty('documentId'),
                data: {},
                params: {}
            };

        this.setSettingUrlParams(params);
    },

    updateDeletingUrlParams: function(){
        var model = this.get('model'),
            params = {
                method: 'delete',
                origin: InfinniUI.config.serverUrl,
                path: '/documents/' + this.get('model').getProperty('documentId') + '/<%id%>',
                data: {},
                params: {}
            };

        this.setDeletingUrlParams(params);
    },

    initDataProvider: function(){
        var dataProvider = window.InfinniUI.providerRegister.build('DocumentDataSource');
        this.set('dataProvider', dataProvider);
    },

    getDocumentId: function(){
        return this.get('model').getProperty('documentId');
    },

    setDocumentId: function(documentId){
        this.get('model').setProperty('documentId', documentId);
    },

    getPageNumber: function(){
        return this.get('model').getProperty('pageNumber');
    },

    setPageNumber: function(pageNumber){
        this.get('model').setProperty('pageNumber', pageNumber);
    },

    getPageSize: function(){
        return this.get('model').getProperty('pageSize');
    },

    setPageSize: function(pageSize){
        this.get('model').setProperty('pageSize', pageSize);
    },

    getSelect: function(){
        return this.get('model').getProperty('select');
    },

    setSelect: function(selectStr){
        this.get('model').setProperty('select', selectStr);
    },

    getOrder: function(){
        return this.get('model').getProperty('order');
    },

    setOrder: function(orderConditionStr){
        this.get('model').setProperty('order', orderConditionStr);
    },

    getTotalCount: function(){
        return this.get('model').getProperty('totalCount');
    },

    getNeedTotalCount: function(){
        return this.get('model').getProperty('needTotalCount');
    },

    setNeedTotalCount: function(needTotalCount){
        this.get('model').setProperty('needTotalCount', needTotalCount);
    },

    beforeDeleteItem: function(item){
        var itemId = this.idOfItem(item);
        if(itemId !== undefined){
            this.setDeletingUrlParams('params.id', itemId);
        }
    },

    setIdFilter: function (itemId) {
        this.setFilter('eq(' + this.getIdProperty() + ','+ this.quoteValue(itemId) + ')');
    },

    quoteValue: function (value) {
        var VALUE_QUOTE_CHAR = '\'';

        if (_.isString(value)) {
            return VALUE_QUOTE_CHAR + value + VALUE_QUOTE_CHAR;
        } else {
            return value;
        }
    }

});

window.InfinniUI.DocumentDataSource = DocumentDataSource;
