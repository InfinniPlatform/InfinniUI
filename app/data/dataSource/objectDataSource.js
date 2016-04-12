var ObjectDataSource = newBaseDataSource.extend({

    initDataProvider: function(){
        var dataProvider = window.providerRegister.build('ObjectDataSource');
        this.set('dataProvider', dataProvider);
    },

    setItems: function(items){
        this.get('dataProvider').setItems(items);
        this.updateItems();
    }

});