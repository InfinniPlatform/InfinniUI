function PdfViewerBuilder() {
}

_.inherit(PdfViewerBuilder, ElementBuilder);

_.extend(PdfViewerBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        params.element.setUrl(params.metadata.Value);

        if( params.metadata.Width ) {
            params.element.setWidth(params.metadata.Width);
        }

        if( params.metadata.Height ) {
            params.element.setHeight(params.metadata.Height);
        }
    },

    createElement: function (params) {
        return new PdfViewer(params.parentView);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.view && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.view).executeScript( metadata.OnLoaded );
            });
        }
    }
}, builderValuePropertyMixin);

InfinniUI.ApplicationBuilder.addToRegisterQueue('PdfViewer', new PdfViewerBuilder());
