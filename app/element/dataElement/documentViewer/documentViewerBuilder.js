function DocumentViewerBuilder() {
}

_.inherit(DocumentViewerBuilder, ElementBuilder);

_.extend(DocumentViewerBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        params.element.setView(params.parent);
        params.element.setDataSource(params.metadata.DataSource);
        params.element.setPrintViewType(params.metadata.PrintViewType);
        params.element.setPrintViewId(params.metadata.PrintViewId);

        //this.initDataSource(params);
    },

    createElement: function (params) {
        return new DocumentViewer(params.parent);
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
