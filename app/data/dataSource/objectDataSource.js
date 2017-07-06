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
        this._detectIdentifyingMode( items );

        var indexOfItemsById;

        this.set( 'isDataReady', true );
        this.get( 'model' ).setProperty( 'items', items );
        this.get( 'dataProvider' ).setItems( items );
        this._clearModifiedSet();

        if( items && items.length > 0 ) {
            indexOfItemsById = this._indexItemsById( items );
            this.set( 'itemsById', indexOfItemsById );

            if( !this._restoreSelectedItem() ) {
                this.setSelectedItem( items[ 0 ] );
            }
        } else {
            this.setSelectedItem( null );
        }
    }

} );

InfinniUI.ObjectDataSource = ObjectDataSource;
