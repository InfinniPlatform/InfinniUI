/**
 * @augments BaseDataSource
 * @constructor
 */
var ObjectDataSource = BaseDataSource.extend( {

    /**
     *
     */
    initDataProvider: function() {
        var dataProvider = InfinniUI.providerRegister.build( 'ObjectDataSource' );
        this.set( 'dataProvider', dataProvider );
    },

    /**
     *
     */
    initialize: function() {
        BaseDataSource.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        this.initHandlers();
    },

    /**
     *
     */
    initHandlers: function() {
        var model = this.get( 'model' );
        var updateFilter = _.bind( this.updateFilter, this );

        model.setProperty( 'filterParams', {} );
        model.onPropertyChanged( 'filter', updateFilter );
        model.onPropertyChanged( 'filterParams.*', updateFilter );
    },

    /**
     *
     */
    updateFilter: function() {
        var dataProvider = this.get( 'dataProvider' );
        var filterPattern = this.getFilter();
        var filterParams = this.getFilterParams();

        dataProvider.setFilter( filterPattern, filterParams );
    },

    // в отличии от _setItems должен установить элементы "насовсем", т.е. изменить в провайдере тоже
    /**
     *
     * @param items
     */
    setItems: function( items ) {
        this.get( 'dataProvider' ).setItems( items );
        this.updateItems();
    },

    // этот метод необходим чтобы данные попадали в провайдер когда они приходят через байдинг (UI-2881)
    /**
     *
     * @param items
     * @private
     */
    _setItems: function( items ) {
        this.get( 'dataProvider' ).setItems( items );
        BaseDataSource.prototype._setItems.apply( this, [ items ] );
    }

} );

InfinniUI.ObjectDataSource = ObjectDataSource;
