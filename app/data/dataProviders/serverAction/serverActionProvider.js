var ServerActionProvider = function () {
};

ServerActionProvider.prototype.request = function (requestData, resultCallback) {
    var that = this;
    var requestId = Math.round((Math.random() * 100000));

    $.ajax({
        type: requestData.method,
        url: requestData.requestUrl,
        xhrFields: {
            withCredentials: true
        },
        data: requestData.args,
        success: function(data){
            if( _.isFunction(resultCallback) ){
                resultCallback({
                    requestId: requestId,
                    data: data
                });
            }
        },
        error: function (data) {
            if( _.isFunction(resultCallback) ){
                resultCallback({
                    requestId: requestId,
                    data: data
                });
            }
        }
    });

    return requestId;
};

ServerActionProvider.prototype.download = function (requestData, resultCallback) {
    new DownloadExecutor(resultCallback)
        .run(requestData);
};

