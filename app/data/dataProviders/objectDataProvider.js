var ObjectDataProvider = function(items, idProperty){
    this.items = items || [];
    this.idProperty = idProperty || 'Id';
}

_.extend(ObjectDataProvider.prototype, {

    getItems: function (criteriaList, pageNumber, pageSize, sorting, resultCallback) {
        resultCallback(this.items);
    },

    createItem: function (resultCallback) {
        resultCallback({});
    },

    saveItem: function (item, resultCallback) {
        var items = this.items,
            itemIndex = this._getIndexOfItem(item),
            result = {
                isValid: true
            };

        if(itemIndex == -1){
            items.push(item);
        }else{
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

        if(itemIndex == -1){
            result.isValid = false;
            result.message = 'Удаляемый элемент не найден';
        }else{
            items.splice(itemIndex, 1);
        }

        resultCallback(result);
    },

    _getIndexOfItem: function (item) {
        var itemId = item[this.idProperty],
            items = this.items;

        for(var i = 0, ii = items.length; i < ii; i++){
            if(items[i][this.idProperty] === itemId ) {
                return i;
            }
        }

        return -1;
    }
});
