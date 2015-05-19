var DataProviderUpload = function (urlConstructor, successCallback, failCallback) {
    this.urlConstructor = urlConstructor;
    this.successCallback = successCallback;
    this.failCallback = failCallback;
};

DataProviderUpload.prototype.uploadFile = function (fieldName, instanceId, file, resultCallback) {
    var requestData = this.urlConstructor.constructUploadFileRequest(fieldName, instanceId, file);
    new RequestExecutor(resultCallback, this.successCallback, this.failCallback).makeRequestRaw(requestData);
};

DataProviderUpload.prototype.getFileUrl = function (fieldName, instanceId) {
    return this.urlConstructor.getFileUrl(fieldName, instanceId);
};