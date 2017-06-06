/**
 *
 * @param idProperty
 * @constructor
 */
var LocalStorageDataProvider = function( idProperty ) {
    this.idProperty = idProperty || '_id';
    this.filter = '';
};

_.extend( LocalStorageDataProvider.prototype, {

    /**
     *
     * @param items
     */
    setItems: function( items ) {
        localStorage.clear();
        if( items && items.length > 0 ) {
            this.setLSItems( items );
        }
    },

    /**
     *
     * @param resultCallback
     */
    getItems: function( resultCallback ) {
        var items = this.getLSItems();
        var filter = this.getFilter();

        if( filter ) {
            items = filterItems( items, filter );
        }
        resultCallback( { data: items } );
    },

    /**
     *
     * @returns {*}
     */
    getLSItems: function() {
        return JSON.parse( localStorage.getItem( 'items' ) );
    },

    /**
     *
     * @param items
     */
    setLSItems: function( items ) {
        localStorage.setItem( 'items', JSON.stringify( items ) );
    },

    /**
     *
     * @param filterPattern
     * @param filterParams
     */
    setFilter: function( filterPattern, filterParams ) {
        var param;
        var correctFilter = false;
        var re = /\<\%[a-zA-Z0-9\s]+\%\>/g;

        if( filterPattern.search( re ) === -1 ) {
            correctFilter = true;
        } else {
            while( param = re.exec( filterPattern ) ) {
                var paramName = param[ 0 ].replace( /\s+/, '' ).slice( 2, -2 );
                var paramValue = filterParams[ paramName ] || '';
                if( paramValue.length ) {
                    correctFilter = true;
                }
                filterPattern = filterPattern.slice( 0, param.index ) + '\'' + paramValue + '\'' + filterPattern.slice( param.index + param[ 0 ].length );
                param.lastIndex = param.index + paramValue.length;
            }
        }

        if( correctFilter ) {
            this.filter = filterPattern;
        } else {
            this.filter = '';
        }
    },

    /**
     *
     * @returns {string|*}
     */
    getFilter: function() {
        return this.filter;
    },

    /**
     *
     * @param resultCallback
     */
    createItem: function( resultCallback ) {
        var item = this.createLocalItem( this.idProperty );

        resultCallback( item );
    },

    /**
     *
     * @param item
     */
    addLSItem: function( item ) {
        var items = this.getLSItems();

        items.push( item );
        this.setLSItems( items );
    },

    /**
     *
     * @param itemIndex
     * @param item
     */
    updateLSItem: function( itemIndex, item ) {
        var items = this.getLSItems();

        items[ itemIndex ] = item;
        this.setLSItems( items );
    },

    /**
     *
     * @param itemIndex
     */
    deleteLSItem: function( itemIndex ) {
        var items = this.getLSItems();

        items.splice( itemIndex, 1 );
        this.setLSItems( items );
    },

    /**
     *
     * @param item
     * @param successCallback
     */
    saveItem: function( item, successCallback ) {
        if( !item[ this.idProperty ] ) {
            throw new Error( 'У элемента отсутствует свойство "' + this.idProperty + '"' );
        }
        var items = JSON.parse( localStorage.getItem( 'items' ) );
        var itemIndex = this._getIndexOfItem( item );

        if( itemIndex == -1 ) {
            this.addLSItem( item );
        } else {
            this.updateLSItem( itemIndex, item );
        }

        successCallback( {} );
    },

    /**
     *
     * @param item
     * @param successCallback
     * @param errorCallback
     */
    deleteItem: function( item, successCallback, errorCallback ) {
        var items = this.getLSItems();
        var itemIndex = this._getIndexOfItem( item );
        var validationResult = new ValidationResult();

        if( itemIndex != -1 ) {
            this.deleteLSItem( itemIndex );
            successCallback( {} );
        } else {
            validationResult.error( 'Удаляемый элемент не найден' );
            errorCallback( {
                data: {
                    Result: {
                        ValidationResult: validationResult
                    }
                }
            } );
        }
    },

    /**
     *
     * @param item
     * @returns {number}
     * @private
     */
    _getIndexOfItem: function( item ) {
        var items = this.getLSItems();

        for( var i = 0; i < items.length; i += 1 ) {
            if( items[ i ][ this.idProperty ] === item[ this.idProperty ] ) {
                return i;
            }
        }
        return -1;
    },

    /**
     *
     * @param id
     * @returns {[*]}
     */
    createIdFilter: function( id ) {
        return [ {
            'Property': '_id',
            'Value': id,
            'CriteriaType': 1
        } ];
    },

    /**
     *
     * @param idProperty
     * @returns {*}
     */
    createLocalItem: function( idProperty ) {
        var result = {};

        result[ idProperty ] = this._generateLocalId();
        return result;
    },

    /**
     *
     * @returns {*}
     * @private
     */
    _generateLocalId: function() {
        return guid();
    }

} );

InfinniUI.Providers.LocalStorageDataProvider = LocalStorageDataProvider;
