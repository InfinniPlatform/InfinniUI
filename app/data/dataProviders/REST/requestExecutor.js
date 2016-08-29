var RequestExecutorDataStrategy = function (type) {
    if (typeof this.strategies[type] === 'undefined') {
        this.strategy = this.strategies.json
    } else {
        this.strategy = this.strategies[type];
    }
};

window.InfinniUI.RequestExecutorDataStrategy = RequestExecutorDataStrategy;

RequestExecutorDataStrategy.prototype.request = function (requestData, successCallbackHandler, failCallbackHandler) {
    return this.strategy.apply(this, Array.prototype.slice.call(arguments));
};

RequestExecutorDataStrategy.prototype.strategies = {

    json: function (requestData, onSuccess, onFail) {
        return $.ajax({
            type: requestData.method || 'post',
            url: requestData.requestUrl,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: this.onBeforeRequest(),
            success: this.onSuccessRequest(onSuccess),
            error: function (err) {
                if (err.status === 200) {
                    //@TODO Убрать этот костыль. Нужен т.к. запрос на загрузку файла возвращает 200 и пустой ответ!
                    this.onSuccessRequest(onSuccess)();
                } else {
                    this.onErrorRequest(onFail)(err);
                }
            }.bind(this),
            data: JSON.stringify(requestData.args),
            contentType: "application/json;charset=UTF-8"
        });
    },

    raw: function (requestData, onSuccess, onFail) {
        var method = requestData.method || 'post';
        var processData = method.toUpperCase() === 'GET';
        return $.ajax({
            type: method,
            url: requestData.requestUrl,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: this.onBeforeRequest(),
            success: this.onSuccessRequest(onSuccess),
            error: function (err) {
                if (err.status === 200) {
                    //@TODO Убрать этот костыль. Нужен т.к. запрос на загрузку файла возвращает 200 и пустой ответ!
                    this.onSuccessRequest(onSuccess)();
                } else {
                    this.onErrorRequest(onFail)(err);
                }
            }.bind(this),
            processData: processData,
            contentType: false,
            data: requestData.args
        });
    }
};

_.extend(RequestExecutorDataStrategy.prototype, ajaxRequestMixin);

function RequestExecutor(resultCallback, successCallback, failCallback, cache) {

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

    var cacheRequest = function (requestData, request) {
        if (typeof cache === 'undefined' || cache === null) {
            return request(requestData);
        } else {
            var data = cache.get(requestData);
            if (data !== false) {
                console.log('Fetch from cache');
                var defer = $.Deferred();
                successCallbackHandler(data);
                defer.resolve(data);
                return defer.promise();
            }
            return request(requestData).then(function (data) {
                cache.set(requestData, data);
            });
        }
    };

    var request = function (type, requestData) {
        var strategy = new RequestExecutorDataStrategy(type);
        return strategy.request(requestData, successCallbackHandler, failCallbackHandler);
    };

    this.makeRequest = function (requestData) {
        return cacheRequest(requestData, request.bind(undefined, 'json'))
    };

    this.makeRequestRaw = function (requestData) {
        return cacheRequest(requestData, request.bind(undefined, 'raw'))
    };

}
