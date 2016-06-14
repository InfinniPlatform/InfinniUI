var ObjectDataProvider = function (items, idProperty) {
    this.items = items || [];
    this.idProperty = idProperty || '_id';
};

_.extend(ObjectDataProvider.prototype, {

    setItems: function (items) {
        this.items = items;
    },

    getItems: function (resultCallback, criteriaList, pageNumber, pageSize, sorting) {
        //var filter = new FilterCriteriaType();
        //var callback = filter.getFilterCallback(criteriaList);
        resultCallback({data: this.items.slice()});
    },

    createItem: function (resultCallback) {
        var item = this.createLocalItem(this.idProperty);
        resultCallback(item);
    },

    saveItem: function (item, resultCallback) {
        var items = this.items,
            itemIndex = this._getIndexOfItem(item),
            result = {
                isValid: true
            };

        if (itemIndex == -1) {
            items.push(item);
        } else {
            items[itemIndex] = item;
        }

        resultCallback(result);
    },

    deleteItem: function (item, resultCallback) {
        var items = this.items,
            itemIndex = this._getIndexOfItem(item),
            result = {
                isValid: true
            };

        if (itemIndex == -1) {
            result.isValid = false;
            result.message = 'Удаляемый элемент не найден';
        } else {
            items.splice(itemIndex, 1);
        }

        resultCallback(result);
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