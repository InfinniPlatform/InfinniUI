function DataProviderREST(urlConstructor, successCallback, failCallback) {

    var queueReplaceItem = new DataProviderReplaceItemQueue();

    this.getItems = function (criteriaList, pageNumber, pageSize, sorting, resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructReadDocumentRequest(criteriaList, pageNumber, pageSize, sorting));
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

    this.createIdFilter = function(id){
        return [{
            "Property": "Id",
            "Value": id,
            "CriteriaType": 1
        }];
    };

    this.saveItem = function (value, resultCallback, warnings, idProperty) {

        var callback = function(data){
            data = adaptAnswerOnSavingItem(data);
            resultCallback(data);
        };

        if(value['__Id']){
            delete value[idProperty];
        }

        var request = (function (success) {
            return function (data) {
                var request = new RequestExecutor(success, successCallback, failCallback);
                return request.makeRequest(urlConstructor.constructUpdateDocumentRequest(data.value, data.warnings));
            }
        })(callback);

        queueReplaceItem.append({
            value: value,
            warnings: warnings
        }, request);

    };

    this.setConfigId = function(configId){
        urlConstructor.setConfigId (configId);
    };

    this.setDocumentId = function(documentId){
        urlConstructor.setDocumentId (documentId);
    };

    this.setCreateAction = function(actionName){
        urlConstructor.setCreateAction (actionName);
    };

    this.setReadAction = function(actionName){
        urlConstructor.setReadAction (actionName);
    };

    this.setUpdateAction = function(actionName){
        urlConstructor.setUpdateAction (actionName);
    };

    this.setDeleteAction = function(actionName){
        urlConstructor.setDeleteAction (actionName);
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
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructReadDocumentRequest(criteriaList, 0, 1));
    };


    this.getCreateAction = proxyTo(urlConstructor, 'getCreateAction');
    this.setCreateAction = proxyTo(urlConstructor, 'setCreateAction');
    this.getReadAction = proxyTo(urlConstructor, 'getReadAction');
    this.setReadAction = proxyTo(urlConstructor, 'setReadeAction');
    this.getUpdateAction = proxyTo(urlConstructor, 'getUpdateAction');
    this.setUpdateAction = proxyTo(urlConstructor, 'setUpdateAction');
    this.getDeleteAction = proxyTo(urlConstructor, 'getDeleteAction');
    this.setDeleteAction = proxyTo(urlConstructor, 'setDeleteAction');

    function proxyTo(obj, methodName) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            var method = obj[methodName];
            if (typeof method === 'function') {
                return method.apply(obj, args);
            }
        }
    }
}