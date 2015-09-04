function ScrollPanelBuilder() {
}

_.inherit(ScrollPanelBuilder, ElementBuilder);

_.extend(ScrollPanelBuilder.prototype, {
    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params)
        ;
        var element = params.element,
            metadata = params.metadata;

        element.setVerticalScroll(metadata.VerticalScroll);
        element.setHorizontalScroll(metadata.HorizontalScroll);
        element.setLayoutPanel(params.builder.build(params.parent, metadata.LayoutPanel, params.collectionProperty, {parentElement: element}));
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
        return new ScrollPanel(params.parent);
    }
});