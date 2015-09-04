function StackPanelBuilder() {
}

_.inherit(StackPanelBuilder, ElementBuilder);

_.extend(StackPanelBuilder.prototype, {
    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        var element = params.element,
            metadata = params.metadata;

        element.setOrientation(metadata.Orientation);

        _.each(metadata.Items, function (metadataItem) {
            element.addItem(params.builder.build(params.parent, metadataItem, params.collectionProperty, {parentElement: element}));
        });
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

    createElement: function(params){
        return new StackPanel(params.parent);
    }
});