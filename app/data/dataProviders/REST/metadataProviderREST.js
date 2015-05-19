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

    this.getViewMetadata = function (resultCallback) {

        new RequestExecutor(resultCallback,successCallback,failCallback).makeRequest(metadataUrlConstructor.constructViewMetadataRequest());

    };


    this.getMenuMetadata = function (resultCallback) {

        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(metadataUrlConstructor.constructMenuMetadataRequest());

    };


}