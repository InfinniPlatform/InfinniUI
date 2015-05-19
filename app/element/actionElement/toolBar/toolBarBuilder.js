function ToolBarBuilder() {
}

_.inherit(ToolBarBuilder, ElementBuilder);

_.extend(ToolBarBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
        var metadata = params.metadata;

        _.each(params.metadata.Items, function (metadataItem) {
            if (metadata.Enabled == false) {
                metadataItem.ToolBarButton.Enabled = false;
            }

            var btn = params.builder.build(params.parent, metadataItem);
            btn.setParentEnabled(metadata.Enabled);
            params.element.addItem(btn);
        });


        params.element.onEnabledChange(function () {
            var enabled = params.element.getEnabled();
            _.each(params.element.getItems(), function(item){
                item.control.set('parentEnabled', enabled);
            });
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