function ExtensionPanelBuilder() {
}

_.inherit(ExtensionPanelBuilder, ElementBuilder);

_.extend(ExtensionPanelBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        var metadata = params.metadata;
        params.element.setExtensionName(metadata.ExtensionName);

        var parameters = [];
        _.each(metadata.Parameters, function (item) {

            var itemToBuild = {
                "Parameter": item
            };

            var param = params.builder.build(params.parent, itemToBuild);
            parameters[param.getName()] = param;
        });

        params.element.setParameters(parameters);
        params.element.setContext(params.parent.getContext());
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.parent && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnLoaded.Name);
            });
        }
    },

    createElement: function () {
        return new ExtensionPanel(this.parent);
    }

});
