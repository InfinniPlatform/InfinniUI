function ObjectDataProvider(metadata, items) {

    this.getItems = function (criteriaList, pageNumber, pageSize, sorting, resultCallback) {

        resultCallback(items);

    };

    this.createItem = function (resultCallback) {

        resultCallback({});
    };

    this.replaceItem = function (value, resultCallback) {

        for(var i = 0; i < items.length; i++){
            if(InfinniUI.ObjectUtils.getPropertyValue(items[i],metadata.IdProperty) === InfinniUI.ObjectUtils.getPropertyValue(value, metadata.IdProperty) ){
                items[i] = value;
                resultCallback(items[i]);
                break;
            }
        }

    };

    this.deleteItem = function (instanceId, resultCallback) {

        for(var i = 0; i < items.length; i++){
            if(InfinniUI.ObjectUtils.getPropertyValue(items[i], metadata.IdProperty) === instanceId ) {
                items.splice(i,1);
                resultCallback(items);
                break;
            }
        }
    };

    this.getItem = function (itemId, resultCallback) {
        for(var i = 0; i < items.length; i++){
            if(InfinniUI.ObjectUtils.getPropertyValue(items[i], metadata.IdProperty) === itemId ) {

                resultCallback(items[i]);
                break;
            }
        }

    };

}