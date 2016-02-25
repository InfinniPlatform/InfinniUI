var DocumentDataSource = BaseDataSource.extend({
    defaults: _.defaults({

        configId:           null,
        documentId:         null,
        createActionName:   'CreateDocument',
        readActionName:     'GetDocument',
        updateActionName:   'SetDocument',
        deleteActionName:   'DeleteDocument'

    }, BaseDataSource.prototype.defaults),


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

    getConfigId: function(){
        return this.get('configId');
    },

    setConfigId: function(configId){
        var dataProvider = this.get('dataProvider');

        dataProvider.setConfigId(configId);
        this.set('configId', configId);
    },

    getDocumentId: function(){
        return this.get('documentId');
    },

    setDocumentId: function(documentId){
        var dataProvider = this.get('dataProvider');

        dataProvider.setDocumentId(documentId);
        this.set('documentId', documentId);
    },

    getCreateAction: function(){
        return this.get('createActionName');
    },

    setCreateAction: function(createActionName){
        var dataProvider = this.get('dataProvider');

        dataProvider.setCreateAction(createActionName);
        this.set('createActionName', createActionName);
    },

    getReadAction: function(){
        return this.get('readActionName');
    },

    setReadAction: function(readActionName){
        var dataProvider = this.get('dataProvider');

        dataProvider.setReadAction(readActionName);
        this.set('readActionName', readActionName);
    },

    getUpdateAction: function(){
        return this.get('updateActionName');
    },

    setUpdateAction: function(updateActionName){
        var dataProvider = this.get('dataProvider');

        dataProvider.setUpdateAction(updateActionName);
        this.set('updateActionName', updateActionName);
    },

    getDeleteAction: function(){
        return this.get('deleteActionName');
    },

    setDeleteAction: function(deleteActionName){
        var dataProvider = this.get('dataProvider');

        dataProvider.setDeleteAction(deleteActionName);
        this.set('deleteActionName', deleteActionName);
    },

    saveItem: function (item, success, error) {
        var
            dataProvider = this.get('dataProvider'),
            ds = this;

        BaseDataSource.prototype.saveItem.call(this, item, function () {
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
