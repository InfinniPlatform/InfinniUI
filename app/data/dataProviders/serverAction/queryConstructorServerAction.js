function QueryConstructorServerAction (host, metadata) {
    this.host = host;
    this.metadata = metadata;
}

QueryConstructorServerAction.prototype.constructUrlRequest = function (params) {
    var data = {
        "Configuration": this.metadata.ConfigId,
        "Metadata": this.metadata.DocumentId,
        "Params": params
    };

    //var urlTemplate = '{0}/RestfulApi/UrlEncodedData/configuration/serveraction/?Form={1}';
    var urlTemplate = 'http://localhost:3000/file';

    return {
        requestUrl: stringUtils.format(urlTemplate, [this.host, JSON.stringify(data)]),
        args: data
    };
};