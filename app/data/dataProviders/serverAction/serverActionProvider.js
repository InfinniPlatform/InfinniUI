var ServerActionProvider = function (urlConstructor, successCallback, failCallback) {
    this.urlConstructor = urlConstructor;
    this.successCallback = successCallback;
    this.failCallback = failCallback;
};

ServerActionProvider.prototype.request = function (params, resultCallback) {
    var requestData = this.urlConstructor.constructUrlRequest(params);
    new RequestExecutor(resultCallback, this.successCallback, this.failCallback)
        .makeRequestRaw(requestData);

};

ServerActionProvider.prototype.download = function (params, resultCallback) {
    var requestData = this.urlConstructor.constructUrlRequest(params);
    new DownloadExecutor(resultCallback, this.successCallback, this.failCallback)
        .run(requestData);
};

