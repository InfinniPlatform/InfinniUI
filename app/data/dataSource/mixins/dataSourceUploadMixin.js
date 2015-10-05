var dataSourceUploadMixin = {

    initDataSourceUploadMixin: function (providerName) {
        var dataProviderUpload = window.providerRegister.build('UploadDocumentDataSource', metadata);
    },

    setUploadDataProvider: function (dataProvider) {
        this.set('uploadDataProvider', dataProvider);
    },

    getUploadDataProvider: function () {
        return this.get('uploadDataProvider');
    }

};