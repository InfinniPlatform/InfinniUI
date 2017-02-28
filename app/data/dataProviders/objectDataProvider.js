var ObjectDataProvider = function (items, idProperty) {
    this.items = items || [];
    this.idProperty = idProperty || '_id';
    this.filter = '';
};

_.extend(ObjectDataProvider.prototype, {

    setItems: function (items) {
        this.items = items;
    },

    getItems: function (resultCallback) {
        var items = this.items.slice();
        var filter = this.getFilter();

        if( filter ) {
            items = filterItems( items, filter );
        }
        resultCallback({data: items});
    },

    setFilter: function(filterPattern, filterParams) {
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

    createItem: function (resultCallback) {
        var item = this.createLocalItem(this.idProperty);
        resultCallback(item);
    },

    saveItem: function (item, successCallback) {
        var items = this.items,
            itemIndex = this._getIndexOfItem(item);

        if (itemIndex == -1) {
            items.push(item);
        } else {
            items[itemIndex] = item;
        }

        successCallback( {} );
    },

    deleteItem: function (item, successCallback, errorCallback) {
        var items = this.items,
            itemIndex = this._getIndexOfItem(item);

        if (itemIndex != -1) {
            items.splice(itemIndex, 1);
            successCallback( {} );
        } else {
            errorCallback({
                data: {
                    Result: {
                        ValidationResult: {
                            IsValid: false,
                            Items: [{
                                Property: '',
                                Message: 'Удаляемый элемент не найден'
                            }]
                        }
                    }
                }
            });
        }
    },

    createIdFilter: function (id) {
        return [{
            "Property": "_id",
            "Value": id,
            "CriteriaType": 1
        }];
    },

    _getIndexOfItem: function (item) {
        return  _.indexOf(this.items, item);
    },

    createLocalItem: function (idProperty) {
        var result = {};

        result[idProperty] = this._generateLocalId();

        return result;
    },

    _generateLocalId: function () {
        return guid();
    }
});

window.InfinniUI.Providers.ObjectDataProvider = ObjectDataProvider;