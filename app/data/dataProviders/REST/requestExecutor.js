function RequestExecutor(resultCallback, successCallback, failCallback) {

    var successCallbackHandler = function (data) {
        if (successCallback) {
            successCallback(data);
        }
        if (resultCallback) {
            resultCallback(data);
        }
    };

    var failCallbackHandler = function (err) {
        if (failCallback) {
            failCallback(err);
        }
        if (resultCallback) {
            resultCallback(err.responseJSON);
        }
    };

    this.makeRequest = function (requestData) {
        return $.ajax({
            type: 'post',
            url: requestData.requestUrl,
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify(requestData.args),
            contentType: "application/json;charset=UTF-8",
            success: successCallbackHandler,
            error: failCallbackHandler
        });
    };

    this.makeRequestRaw = function (requestData) {
        return $.ajax({
            type: 'post',
            url: requestData.requestUrl,
            xhrFields: {
                withCredentials: true
            },
            data: requestData.args,
            processData: false,
            contentType: false,
            success: successCallbackHandler,
            error: failCallbackHandler
        });
    };


}