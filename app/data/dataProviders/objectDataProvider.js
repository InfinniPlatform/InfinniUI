var ObjectDataProvider = function (items, idProperty) {
    this.items = items || [];
    this.idProperty = idProperty || '_id';
};

_.extend(ObjectDataProvider.prototype, {

    setItems: function (items) {
        this.items = items;
    },

    getItems: function (resultCallback) {
        resultCallback({data: this.items.slice()});
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