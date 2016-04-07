var RestDataSource = newBaseDataSource.extend({
    initDataProvider: function(){
        var dataProvider = window.providerRegister.build('RestDataSource');
        this.set('dataProvider', dataProvider);
    }
});