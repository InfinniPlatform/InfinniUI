var DocumentDataSource = BaseDataSource.extend({

    initDataProvider: function(){
        var dataProvider = new window.providerRegister.build('DocumentDataSource');
        this.set('dataProvider', dataProvider);
    }

});