var serverActionContentTypeStrategy = {
    "File": {
        run: function (provider, params, callback) {
            provider.download(params, callback);
        }
    },
    "Object": {
        run: function (provider, params, callback) {
            provider.request(params, callback);
        }
    }
};