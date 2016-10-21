var ObjectDataSource = BaseDataSource.extend({

    initDataProvider: function(){
        var dataProvider = window.InfinniUI.providerRegister.build('ObjectDataSource');
        this.set('dataProvider', dataProvider);
    },

    setItems: function(items){
        this.get('dataProvider').setItems(items);
        this.updateItems();
    },

    _setItems: function(items){
        this.get('dataProvider').setItems(items);
        BaseDataSource.prototype._setItems.apply(this, [items]);
    }

});

window.InfinniUI.ObjectDataSource = ObjectDataSource;
