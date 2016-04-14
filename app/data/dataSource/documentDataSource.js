var DocumentDataSource = RestDataSource.extend({
    defaults: _.defaults({
        documentId: null

    }, RestDataSource.prototype.defaults),

    initialize: function () {
        newBaseDataSource.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        this.updateGettingUrlParams();
    },

    updateGettingUrlParams: function(){
        var model = this.get('model'),
            params = {
                type: 'get',
                origin: InfinniUI.config.serverUrl,
                path: '/' + this.get('documentId'),
                data: {},
                params: {}
            },
            filter = model.getProperty('filter'),
            filterParams = model.getProperty('filterParams'),
            page = model.getProperty('page'),
            pageSize = model.getProperty('pageSize'),
            searchStr = model.getProperty('search'),
            select = model.getProperty('select'),
            order = model.getProperty('order'),
            count = model.getProperty('order');

        if(filter){
            params.data.filter = filter;
            if(filterParams){
                _.extend(params.params, filterParams);
            }
        }

        if(pageSize){
            page = page || 0;
            params.data.skip = page*pageSize;
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

    initDataProvider: function(){
        var dataProvider = window.providerRegister.build('DocumentDataSource');

        this.set('dataProvider', dataProvider);
    },

    getDocumentId: function(){
        return this.get('documentId');
    },

    getFilter: function(){
        return this.get('model').getProperty('filter');
    },

    setFilter: function(filter){
        this.get('model').setProperty('filter');
    },

    getFilterParams: function(){
        return this.get('model').getProperty('filterParams');
    },

    setFilterParams: function(filterParams){
        this.get('model').setProperty('filterParams');
    },

    setDocumentId: function(documentId){
        var dataProvider = this.get('dataProvider');

        dataProvider.setDocumentId(documentId);
        this.set('documentId', documentId);
    },

    saveItem: function (item, success, error) {
        var
            dataProvider = this.get('dataProvider'),
            ds = this;

        RestDataSource.prototype.saveItem.call(this, item, function () {
            uploadFiles(success, error);
        }, error);

        function uploadFiles (success, error) {
            ds.extractFiles(item, function (files, itemWithoutFiles) {
                dataProvider.saveItem(itemWithoutFiles, function (data) {
                    if (!('isValid' in data) || data.isValid === true) {
                        //@TODO Что приходит в ответ на сохранение?????
                        ds.uploadFiles(data.Id, files)
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
            });
        }
    }

});
