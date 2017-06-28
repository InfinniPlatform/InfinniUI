/**
 * @constructor
 * @augments RestDataSource
 */
var DocumentDataSource = RestDataSource.extend( {

    defaults: _.defaults( {
        documentId: null

    }, RestDataSource.prototype.defaults ),

    /**
     *
     */
    initialize: function() {
        RestDataSource.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );

        var model = this.get( 'model' );

        model.setProperty( 'pageNumber', 0 );
        model.setProperty( 'pageSize', 15 );
        this.setUpdatingItemsConverter( function( data ) {
            model.setProperty( 'totalCount', data[ 'Result' ][ 'Count' ] );
            model.setProperty( 'additionalResult', data[ 'Result' ][ 'AdditionalResult' ] );
            return data[ 'Result' ][ 'Items' ];
        } );

        this.initHandlers();
    },

    /**
     *
     */
    initHandlers: function() {
        var model = this.get( 'model' );
        var that = this;
        var updateGettingUrlParams = _.bind( this.updateGettingUrlParams, this );
        var updateGettingUrlParamsWithReset = function() {
            that.suspendUpdate( 'updateGettingUrlParams' );
            that.get( 'model' ).setProperty( 'pageNumber', 0 );
            that.updateGettingUrlParams();
            that.resumeUpdate( 'updateGettingUrlParams' );
        };

        model.onPropertyChanged( 'documentId', function() {
            that.updateGettingUrlParams();
            that.updateSettingUrlParams();
            that.updateDeletingUrlParams();
        } );
        model.onPropertyChanged( 'filter', updateGettingUrlParamsWithReset );
        model.onPropertyChanged( 'filterParams.*', updateGettingUrlParamsWithReset );
        model.onPropertyChanged( 'pageNumber', updateGettingUrlParams );
        model.onPropertyChanged( 'pageSize', updateGettingUrlParamsWithReset );
        model.onPropertyChanged( 'search', updateGettingUrlParamsWithReset );
        model.onPropertyChanged( 'select', updateGettingUrlParams );
        model.onPropertyChanged( 'order', updateGettingUrlParamsWithReset );
        model.onPropertyChanged( 'needTotalCount', updateGettingUrlParams );

        this.updateGettingUrlParams();
        this.updateSettingUrlParams();
        this.updateDeletingUrlParams();
    },

    /**
     *
     */
    updateGettingUrlParamsWithReset: function() {
        this.suspendUpdate( 'updateGettingUrlParams' );
        this.get( 'model' ).setProperty( 'pageNumber', 0 );
        this.updateGettingUrlParams();
        this.resumeUpdate( 'updateGettingUrlParams' );
    },

    /**
     *
     */
    updateGettingUrlParams: function() {
        var model = this.get( 'model' );
        var params = {
            method: 'get',
            origin: InfinniUI.config.serverUrl,
            path: '/documents/' + this.get( 'model' ).getProperty( 'documentId' ),
            data: {},
            params: {}
        };
        var filter = model.getProperty( 'filter' );
        var filterParams = model.getProperty( 'filterParams' );
        var pageNumber = model.getProperty( 'pageNumber' );
        var pageSize = model.getProperty( 'pageSize' );
        var searchStr = model.getProperty( 'search' );
        var select = model.getProperty( 'select' );
        var order = model.getProperty( 'order' );
        var needTotalCount = model.getProperty( 'needTotalCount' );

        if( filter ) {
            params.data.filter = filter;
            if( filterParams ) {
                _.extend( params.params, filterParams );
            }
        }

        if( pageSize ) {
            pageNumber = pageNumber || 0;
            params.data.skip = pageNumber * pageSize;
            params.data.take = pageSize;
        }

        if( searchStr ) {
            params.data.search = searchStr;
        }

        if( select ) {
            params.data.select = select;
        }

        if( order ) {
            params.data.order = order;
        }

        if( needTotalCount ) {
            params.data.count = needTotalCount;
        }

        this.setGettingUrlParams( params );
    },

    /**
     *
     */
    updateSettingUrlParams: function() {
        var model = this.get( 'model' );
        var params = {
            method: 'post',
            origin: InfinniUI.config.serverUrl,
            path: '/documents/' + this.get( 'model' ).getProperty( 'documentId' ),
            data: {},
            params: {}
        };

        this.setSettingUrlParams( params );
    },

    /**
     *
     */
    updateDeletingUrlParams: function() {
        var model = this.get( 'model' );
        var params = {
            method: 'delete',
            origin: InfinniUI.config.serverUrl,
            path: '/documents/' + this.get( 'model' ).getProperty( 'documentId' ) + '/<%id%>',
            data: {},
            params: {}
        };

        this.setDeletingUrlParams( params );
    },

    /**
     *
     */
    initDataProvider: function() {
        var dataProvider = InfinniUI.providerRegister.build( 'DocumentDataSource' );
        this.set( 'dataProvider', dataProvider );
    },

    /**
     *
     * @returns {*}
     */
    getDocumentId: function() {
        return this.get( 'model' ).getProperty( 'documentId' );
    },

    /**
     *
     * @param documentId
     */
    setDocumentId: function( documentId ) {
        this.get( 'model' ).setProperty( 'documentId', documentId );
    },

    /**
     *
     * @returns {*}
     */
    getPageNumber: function() {
        return this.get( 'model' ).getProperty( 'pageNumber' );
    },

    /**
     *
     * @param pageNumber
     */
    setPageNumber: function( pageNumber ) {
        this.get( 'model' ).setProperty( 'pageNumber', pageNumber );
    },

    /**
     *
     * @returns {*}
     */
    getPageSize: function() {
        return this.get( 'model' ).getProperty( 'pageSize' );
    },

    /**
     *
     * @param pageSize
     */
    setPageSize: function( pageSize ) {
        this.get( 'model' ).setProperty( 'pageSize', pageSize );
    },

    /**
     *
     * @returns {*}
     */
    getSelect: function() {
        return this.get( 'model' ).getProperty( 'select' );
    },

    /**
     *
     * @param selectStr
     */
    setSelect: function( selectStr ) {
        this.get( 'model' ).setProperty( 'select', selectStr );
    },

    /**
     *
     * @returns {*}
     */
    getOrder: function() {
        return this.get( 'model' ).getProperty( 'order' );
    },

    /**
     *
     * @param orderConditionStr
     */
    setOrder: function( orderConditionStr ) {
        this.get( 'model' ).setProperty( 'order', orderConditionStr );
    },

    /**
     *
     * @returns {*}
     */
    getTotalCount: function() {
        return this.get( 'model' ).getProperty( 'totalCount' );
    },

    /**
     *
     * @returns {*}
     */
    getNeedTotalCount: function() {
        return this.get( 'model' ).getProperty( 'needTotalCount' );
    },

    /**
     *
     * @param needTotalCount
     */
    setNeedTotalCount: function( needTotalCount ) {
        this.get( 'model' ).setProperty( 'needTotalCount', needTotalCount );
    },

    /**
     *
     * @param item
     */
    beforeDeleteItem: function( item ) {
        var itemId = this.idOfItem( item );

        if( typeof itemId !== 'undefined' ) {
            this.setDeletingUrlParams( 'params.id', itemId );
        }
    },

    /**
     *
     * @param itemId
     */
    setIdFilter: function( itemId ) {
        this.setFilter( 'eq(' + this.getIdProperty() + ',' + this.quoteValue( itemId ) + ')' );
    },

    /**
     *
     * @param value
     * @returns {*}
     */
    quoteValue: function( value ) {
        var VALUE_QUOTE_CHAR = '\'';

        if( typeof value === 'string' ) {
            return VALUE_QUOTE_CHAR + value + VALUE_QUOTE_CHAR;
        } else {
            return value;
        }
    }

} );

InfinniUI.DocumentDataSource = DocumentDataSource;
