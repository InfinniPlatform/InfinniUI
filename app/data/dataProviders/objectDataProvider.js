/**
 *
 * @param items
 * @param idProperty
 * @constructor
 */
var ObjectDataProvider = function( items, idProperty ) {
    this.items = items || [];
    this.idProperty = idProperty || '_id';
    this.filter = '';
};

_.extend( ObjectDataProvider.prototype, {

    /**
     *
     * @param items
     */
    setItems: function( items ) {
        this.items = items;
    },

    /**
     *
     * @param resultCallback
     */
    getItems: function( resultCallback ) {
        var items = this.items.slice();
        var filter = this.getFilter();

        if( filter ) {
            items = filterItems( items, filter );
        }
        resultCallback( { data: items } );
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
     * @returns {*|string}
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
     * @param successCallback
     */
    saveItem: function( item, successCallback ) {
        var items = this.items;
        var itemIndex = this._getIndexOfItem( item );

        if ( itemIndex === -1 ) {
            items.push( item );
        } else {
            items[ itemIndex ] = item;
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
        var items = this.items;
        var itemIndex = this._getIndexOfItem( item );
        var validationResult = new ValidationResult();

        if ( itemIndex !== -1 ) {
            items.splice( itemIndex, 1 );
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
     * @param id
     * @returns {[*]}
     */
    createIdFilter: function( id ) {
        return [{
            'Property': '_id',
            'Value': id,
            'CriteriaType': 1
        }];
    },

    /**
     *
     * @param item
     * @returns {number}
     * @private
     */
    _getIndexOfItem: function( item ) {
        return  _.indexOf( this.items, item );
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

InfinniUI.Providers.ObjectDataProvider = ObjectDataProvider;
