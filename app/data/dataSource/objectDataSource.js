var ObjectDataSource = BaseDataSource.extend({

    initDataProvider: function(){
        var dataProvider = window.InfinniUI.providerRegister.build('ObjectDataSource');
        this.set('dataProvider', dataProvider);
    },

    initialize: function() {
        BaseDataSource.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        this.initHandlers();
    },

    initHandlers: function() {
        var model = this.get( 'model' );
        var updateFilter = _.bind(this.updateFilter, this);

        model.setProperty('filterParams', {});
        model.onPropertyChanged( 'filter', updateFilter );
        model.onPropertyChanged( 'filterParams.*', updateFilter );
    },

    updateFilter: function() {
        var dataProvider = this.get('dataProvider');
        var filterPattern = this.getFilter();
        var filterParams = this.getFilterParams();

        dataProvider.setFilter(filterPattern, filterParams);
    },

    setItems: function(items){
        this.get('dataProvider').setItems(items);
        this.updateItems();
    },

    _setItems: function(items){
        BaseDataSource.prototype._setItems.apply(this, [items]);
    }

});

window.InfinniUI.ObjectDataSource = ObjectDataSource;
