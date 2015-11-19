function MetadataProviderREST(metadataUrlConstructor, successCallback, failCallback) {

    var makeRequest = function (requestData) {
        return $.ajax({
            type: 'post',
            url: requestData.requestUrl,
            data: JSON.stringify(requestData.args),
            contentType: "application/json;charset=UTF-8",
            success: successCallback,
            fail: failCallback
        });
    };

    this.getViewMetadata = function (resultCallback, onFail) {
        var data = metadataUrlConstructor.constructViewMetadataRequest();
        new RequestExecutor(resultCallback,successCallback,function (err) {
            [onFail, failCallback].forEach(function (callback) {
                if(typeof callback === 'function') {
                    callback.call(null, err);
                }
            });
        }, this.cache).makeRequest(data);
    };

    this.getConfigMetadata = function (resultCallback) {

        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(metadataUrlConstructor.constructConfigMetadataRequest());
    };


    this.getMenuMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback, this.cache).makeRequest(metadataUrlConstructor.constructMenuMetadataRequest());
    };

    this.setCache = function (cache) {
        this.cache = cache;
    }


}