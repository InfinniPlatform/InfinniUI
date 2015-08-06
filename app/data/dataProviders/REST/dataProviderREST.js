function DataProviderREST(metadata, urlConstructor, successCallback, failCallback) {

    var queueReplaceItem = new DataProviderReplaceItemQueue();

    this.getItems = function (criteriaList, pageNumber, pageSize, sorting, resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetDocumentRequest(criteriaList, pageNumber, pageSize, sorting));
    };

    this.createItem = function (resultCallback, idProperty) {
        new RequestExecutor(function(data){
            data[idProperty] = this._generateLocalId();
            data['__Id'] = data[idProperty];
            resultCallback(data);
        }, successCallback, failCallback).makeRequest(urlConstructor.constructCreateDocumentRequest());
    };

    this.createLocalItem = function (idProperty) {
        var result = {};

        result[idProperty] = this._generateLocalId();
        result['__Id'] = result[idProperty];

        return result;
    };

    this._generateLocalId = function(){
        return guid();
    };

    this.saveItem = function (value, resultCallback, warnings, idProperty) {

        var callback = function(data){
            data = adaptAnswerOnSavingItem();
            resultCallback(data);
        };

        if(value['__Id']){
            delete value[idProperty];
        }

        var request = (function (success) {
            return function (data) {
                var request = new RequestExecutor(success, successCallback, failCallback);
                return request.makeRequest(urlConstructor.constructSetDocumentRequest(data.value, data.warnings));
            }
        })(callback);

        queueReplaceItem.append({
            value: value,
            warnings: warnings
        }, request);

    };

    function adaptAnswerOnSavingItem(data){
        if(data.IsValid){
            data.isValid = data.IsValid;
            delete data.IsValid;
        }

        if(data.ValidationMessage && data.ValidationMessage.ValidationErrors){
            data.items = data.ValidationMessage.ValidationErrors;
            delete data.ValidationMessage.ValidationErrors;
        }
        return data;
    }

    this.deleteItem = function (instanceId, resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructDeleteDocumentRequest(instanceId));
    };

    this.getItem = function (itemId, resultCallback, criteriaList) {
        var criteria = {
            "Property": "Id",
            "Value": itemId,
            "CriteriaType": 1
        };

        criteriaList = criteriaList || [];
        criteriaList.push(criteria);
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetDocumentRequest(criteriaList, 0, 1));
    };
}