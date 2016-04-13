var DocumentDataSource = RestDataSource.extend({
    defaults: _.defaults({
        documentId: null

    }, RestDataSource.prototype.defaults),

    initialize: function () {
        newBaseDataSource.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));


    },

    updateGettingUrlParams: function(){
        var model = this.get('model'),
            params = {
                type: 'get',
                origin: InfinniUI.config.serverUrl,
                path: this.get('/documentId'),
                data: {}
            },
            filter = model.getProperty('filter');

        if(filter){

        }

        this.setGettingUrlParams(params);
    },

    initDataProvider: function(){
        var dataProvider = window.providerRegister.build('DocumentDataSource'),
            createActionName = this.getCreateAction(),
            readActionName = this.getReadAction(),
            updateActionName = this.getUpdateAction(),
            deleteActionName = this.getDeleteAction();

        dataProvider.setCreateAction(createActionName);
        dataProvider.setReadAction(readActionName);
        dataProvider.setUpdateAction(updateActionName);
        dataProvider.setDeleteAction(deleteActionName);

        this.set('dataProvider', dataProvider);
    },

    getDocumentId: function(){
        return this.get('documentId');
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
