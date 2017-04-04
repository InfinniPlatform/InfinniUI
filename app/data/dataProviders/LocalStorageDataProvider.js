var LocalStorageDataProvider = function( idProperty ) {
    this.idProperty = idProperty || '_id';
    this.filter = '';
};

_.extend( LocalStorageDataProvider.prototype, {

    setItems: function( items ) {
        localStorage.clear();
        if( items && items.length > 0 ) {
            this.setLSItems( items );
        }
    },

    getItems: function( resultCallback ) {
        var items = this.getLSItems();
        var filter = this.getFilter();

        if( filter ) {
            items = filterItems( items, filter );
        }
        resultCallback( { data: items } );
    },

    getLSItems: function() {
        return JSON.parse( localStorage.getItem( 'items' ) );
    },

    setLSItems: function( items ) {
        localStorage.setItem( 'items', JSON.stringify( items ) );
    },

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

    getFilter: function() {
        return this.filter;
    },

    createItem: function( resultCallback ) {
        var item = this.createLocalItem( this.idProperty );
        resultCallback( item );
    },

    addLSItem: function( item ) {
        var items = this.getLSItems();
        items.push( item );
        this.setLSItems( items );
    },

    updateLSItem: function( itemIndex, item ) {
        var items = this.getLSItems();
        items[ itemIndex ] = item;
        this.setLSItems( items );
    },

    deleteLSItem: function( itemIndex ) {
        var items = this.getLSItems();
        items.splice( itemIndex, 1 );
        this.setLSItems( items );
    },

    saveItem: function( item, successCallback ) {
        if( !item[ this.idProperty ] ) {
            throw( 'У элемента отсутствует свойство "' + this.idProperty + '"' );
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

    _getIndexOfItem: function( item ) {
        var items = this.getLSItems();
        for( var i = 0; i < items.length; i += 1 ) {
            if( items[ i ][ this.idProperty ] === item[ this.idProperty ] ) {
                return i;
            }
        }
        return -1;
    },

    createIdFilter: function( id ) {
        return [ {
            "Property": "_id",
            "Value": id,
            "CriteriaType": 1
        } ];
    },

    createLocalItem: function( idProperty ) {
        var result = {};
        result[ idProperty ] = this._generateLocalId();
        return result;
    },

    _generateLocalId: function() {
        return guid();
    }

} );

window.InfinniUI.Providers.LocalStorageDataProvider = LocalStorageDataProvider;