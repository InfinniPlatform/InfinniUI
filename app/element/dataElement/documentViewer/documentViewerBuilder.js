function DocumentViewerBuilder() {
}

_.inherit(DocumentViewerBuilder, ElementBuilder);

_.extend(DocumentViewerBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        params.element.setView(params.parentView);
        params.element.setParent(params.parent);

        params.element.setConfigId(params.metadata.ConfigId);
        params.element.setDocumentId(params.metadata.DocumentId);
        params.element.setPrintViewId(params.metadata.PrintViewId);
        params.element.setPrintViewType(params.metadata.PrintViewType);
        params.element.setSource(params.metadata.Source.Source);
    },

    createElement: function (params) {
        return new DocumentViewer(params.view);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.view && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnLoaded.Name);
            });
        }
    }
}, builderValuePropertyMixin);
