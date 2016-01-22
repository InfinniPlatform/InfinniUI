function QueryConstructorServerAction (host, metadata) {
    var defaults = {
        Method: 'post'
    };

    this.host = host;
    this.metadata = _.extend({}, defaults, metadata);
}

QueryConstructorServerAction.prototype.constructUrlRequest = function (params) {
    //var data = {
    //    "Configuration": this.metadata.ConfigId,
    //    "Metadata": this.metadata.DocumentId,
    //    "Params": params
    //};

    var urlTemplate = '{0}/{1}/{2}/{3}';
    //var urlTemplate = 'http://localhost:3000/json';
    //var urlTemplate = 'http://localhost:3000/file';

    //@TODO Переделать шаблон, когда будет ясно что нужно.
    return {
        requestUrl: stringUtils.format(urlTemplate,[
            this.host,
            this.metadata.ConfigId,
            this.metadata.DocumentId,
            this.metadata.Action
        ]),
        method: this.metadata.Method,
        args: params
    };
};