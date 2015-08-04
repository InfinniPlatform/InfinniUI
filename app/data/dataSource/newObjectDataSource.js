var ObjectDataSource = BaseDataSource.extend({

    initDataProvider: function(){
        var dataProvider = new window.providerRegister.build('ObjectDataSource')();
        this.set('dataProvider', dataProvider);
    },

    setItems: function(items){
        this.get('dataProvider').setItems();
    }

});