var DocumentDataSource = RestDataSource.extend({
    defaults: _.defaults({
        documentId: null

    }, RestDataSource.prototype.defaults),

    initialize: function () {
        RestDataSource.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

        var model = this.get('model');
        model.setProperty('pageNumber', 0);
        model.setProperty('pageSize', 15);

        this.initHandlers();
    },

    initHandlers: function(){
        var model = this.get('model');
        var that = this;
        var updateGettingUrlParams = _.bind(this.updateGettingUrlParams, this);

        model.onPropertyChanged('documentId', function(){
            that.updateGettingUrlParams();
            that.updateSettingUrlParams();
            that.updateDeletingUrlParams();
        });
        model.onPropertyChanged('filter', updateGettingUrlParams);
        model.onPropertyChanged('filterParams', updateGettingUrlParams);
        model.onPropertyChanged('pageNumber', updateGettingUrlParams);
        model.onPropertyChanged('pageSize', updateGettingUrlParams);
        model.onPropertyChanged('search', updateGettingUrlParams);
        model.onPropertyChanged('select', updateGettingUrlParams);
        model.onPropertyChanged('order', updateGettingUrlParams);
        model.onPropertyChanged('count', updateGettingUrlParams);

        this.updateGettingUrlParams();
        this.updateSettingUrlParams();
        this.updateDeletingUrlParams();
    },

    updateGettingUrlParams: function(){
        var model = this.get('model'),
            params = {
                type: 'get',
                origin: InfinniUI.config.serverUrl,
                path: '/' + this.get('model').getProperty('documentId'),
                data: {},
                params: {}
            },
            filter = model.getProperty('filter'),
            filterParams = model.getProperty('filterParams'),
            pageNumber = model.getProperty('pageNumber'),
            pageSize = model.getProperty('pageSize'),
            searchStr = model.getProperty('search'),
            select = model.getProperty('select'),
            order = model.getProperty('order'),
            count = model.getProperty('count');

        if(filter){
            params.data.filter = filter;
            if(filterParams){
                _.extend(params.params, filterParams);
            }
        }

        if(pageSize){
            pageNumber = pageNumber || 0;
            params.data.skip = pageNumber*pageSize;
            params.data.take = pageSize;
        }

        if(searchStr){
            params.data.search = searchStr;
        }

        if(select){
            params.data.select = select;
        }

        if(order){
            params.data.order = order;
        }

        if(count){
            params.data.count = count;
        }

        this.setGettingUrlParams(params);
    },

    updateSettingUrlParams: function(){
        var model = this.get('model'),
            params = {
                type: 'post',
                origin: InfinniUI.config.serverUrl,
                path: '/' + this.get('model').getProperty('documentId'),
                data: {},
                params: {}
            };

        this.setSettingUrlParams(params);
    },

    updateDeletingUrlParams: function(){
        var model = this.get('model'),
            params = {
                type: 'delete',
                origin: InfinniUI.config.serverUrl,
                path: '/' + this.get('model').getProperty('documentId') + '/<%id%>',
                data: {},
                params: {}
            };

        this.setDeletingUrlParams(params);
    },

    initDataProvider: function(){
        var dataProvider = window.providerRegister.build('DocumentDataSource');

        this.set('dataProvider', dataProvider);
    },

    getDocumentId: function(){
        return this.get('model').getProperty('documentId');
    },

    setDocumentId: function(documentId){
        this.get('model').setProperty('documentId', documentId);
    },

    getFilter: function(){
        return this.get('model').getProperty('filter');
    },

    setFilter: function(filter){
        this.get('model').setProperty('filter', filter);
    },

    getFilterParams: function(){
        return this.get('model').getProperty('filterParams');
    },

    setFilterParams: function(filterParams){
        this.get('model').setProperty('filterParams', filterParams);
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

    getSearch: function(){
        return this.get('model').getProperty('search');
    },

    setSearch: function(searchStr){
        this.get('model').setProperty('search', searchStr);
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

    getCount: function(){
        return this.get('model').getProperty('count');
    },

    setCount: function(isCountNeed){
        this.get('model').setProperty('count', isCountNeed);
    },

    beforeDeleteItem: function(item){
        var itemId = this.idOfItem(item);
        if(itemId !== undefined){
            this.setDeletingUrlParams('params.id', itemId);
        }
    }

});
