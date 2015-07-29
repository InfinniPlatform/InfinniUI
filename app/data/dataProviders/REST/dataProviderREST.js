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

    this.createLocalItem = function (resultCallback, idProperty) {
        var result = {};

        result[idProperty] = this._generateLocalId();
        result['__Id'] = result[idProperty];

        return result;
    };

    this._generateLocalId = function(){
        return guid();
    };

    this.replaceItem = function (value, warnings, resultCallback, idProperty) {

        if(value['__Id']){
            delete value[idProperty];
        }

        var request = (function (resultCallback) {
            return function (data) {
                var request = new RequestExecutor(resultCallback, successCallback, failCallback);
                return request.makeRequest(urlConstructor.constructSetDocumentRequest(data.value, data.warnings));
            }
        })(resultCallback);

        queueReplaceItem.append({
            value: value,
            warnings: warnings
        }, request);

    };

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