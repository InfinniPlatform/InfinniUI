var DocumentDataSource = BaseDataSource.extend({

    initDataProvider: function(){
        var dataProvider = window.providerRegister.build('DocumentDataSource');
        this.set('dataProvider', dataProvider);
    }

});