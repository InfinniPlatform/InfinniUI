var ServerActionProvider = function (urlConstructor, successCallback, failCallback) {
    this.urlConstructor = urlConstructor;
    this.successCallback = successCallback;
    this.failCallback = failCallback;
};

ServerActionProvider.prototype.request = function (params, resultCallback) {
    var requestData = this.urlConstructor.constructUrlRequest(params);
    new RequestExecutor(resultCallback, this.successCallback, this.failCallback).makeRequestRaw(requestData);

};

ServerActionProvider.prototype.download = function (params, resultCallback) {
    var requestData = this.urlConstructor.constructUrlRequest(params);
    var downloadProcess = new DownloadProcess(requestData);
    downloadProcess.run();
};

function DownloadProcess (requestData, callback, options) {
    this.guid = guid();
    var defaults = {
        timeout: 1 * 60 * 1000,
        poll: 100
    };
    this.options = _.defaults({}, options, defaults);
    this._requestData = requestData;
    this.callback = callback;

}

DownloadProcess.prototype.run = function () {
    var windowName = this.getName("window");
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", this._requestData.requestUrl);
    form.setAttribute("target", windowName);
    form.setAttribute("style", "display: none;");

    var dataField = document.createElement("input");
    //dataField.setAttribute("name", "data");
    //dataField.setAttribute("value", JSON.stringify(this._requestData.args));
    dataField.setAttribute("name", 'name');
    dataField.setAttribute("value", 's.png');
    form.appendChild(dataField);

    var tokenField = document.createElement("input");
    tokenField.setAttribute("name", "token");
    tokenField.setAttribute("value", this.getName('token'));
    form.appendChild(tokenField);

    document.body.appendChild(form);

    this.popup = window.open("about:blank", windowName);
    this.waitResponse();
    form.submit();
};

DownloadProcess.prototype.getName = function (name) {
    return name + this.guid;
};

DownloadProcess.prototype.cleanup = function () {
    clearInterval(this.intervalId);
    clearTimeout(this.timeout);
    $.removeCookie(this.getName('token'));
    if (this.popup) {
        this.popup.close();
        this.popup = null;
    }
};

DownloadProcess.prototype.waitResponse = function () {
    var cookieName = this.getName('token');
    var download = this;

    this.intervalId = setInterval(function () {
        var cookie = $.cookie(cookieName);
        if (cookie === cookieName) {
            download.finish();
        }
    }, this.options.poll);

    this.timeout = setTimeout(function () {
        this.cleanup();
    }.bind(this), this.options.timeout);
};

DownloadProcess.prototype.finish = function () {
    this.cleanup();
    if (typeof this.callback === 'function') {
        this.callback.call(this);
    }
};