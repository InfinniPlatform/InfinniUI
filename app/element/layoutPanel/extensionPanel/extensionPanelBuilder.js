﻿function ExtensionPanelBuilder() {
}

_.inherit(ExtensionPanelBuilder, ElementBuilder);

_.extend(ExtensionPanelBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        var metadata = params.metadata;
        params.element.setExtensionName(metadata.ExtensionName);

        var parameters = [];
        var items = [];
        _.each(metadata.Parameters, function (item) {

            var itemToBuild = {
                "Parameter": item
            };

            var param = params.builder.build(params.parent, itemToBuild);
            parameters[param.getName()] = param;
        });

        _.each(metadata.Items, function (item) {
            var itemBuild = params.builder.build(params.parent, item);
            items.push(itemBuild);
        });

        params.element.setParameters(parameters);
        params.element.setItems(items);


        //params.element.setContext(params.parent.getContext());
        params.element.getContext = function () {
            return params.parent.getContext();
        }
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

    createElement: function (params) {
        var element = new ExtensionPanel(this.parent);

        element.getContext = function () {
            return params.parent.getContext();
        };

        return element;
    }

});
