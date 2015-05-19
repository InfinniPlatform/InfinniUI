function ToolBarBuilder() {
}

_.inherit(ToolBarBuilder, ElementBuilder);

_.extend(ToolBarBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        _.each(params.metadata.Items, function (metadataItem) {
            params.element.addItem(params.builder.build(params.parent, metadataItem));
        });

    },

    createElement: function (params) {
        return new ToolBar(params.parent);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.parent && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnLoaded.Name);
            });
        }
    }
});