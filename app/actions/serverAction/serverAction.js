function ServerAction(parentView) {
    _.superClass(ServerAction, this, parentView);
    this.updateContentTypeStrategy();
    this.on('change:contentType', this.updateContentTypeStrategy);
}

_.inherit(ServerAction, BaseAction);

_.extend(ServerAction.prototype, {

    defaults: {
        contentType: 'Object'
    },

    updateContentTypeStrategy: function () {
        var contentType = this.getProperty('contentType');
        this.contentTypeStrategy = serverActionContentTypeStrategy[contentType];
    },

    execute: function (callback) {
        this.contentTypeStrategy.run(this.getProperty('provider'), this.getParametersValue(), callback);
    },

    setParameters: function (parameters) {
        this.setProperty('parameters', parameters);
    },

    getParametersValue: function () {
        var parameters = this.getProperty('parameters');
        var values = {};

        for (var i in parameters) {
            if (!parameters.hasOwnProperty(i)) {
                continue;
            }

            values[i] = parameters[i].getValue();
        }

        return values;
    }
});

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
