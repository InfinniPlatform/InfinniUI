function DataNavigationBuilder() {
}

_.inherit(DataNavigationBuilder, ElementBuilder);

_.extend(DataNavigationBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);


        this.initDataSource(params);
        this.initScriptsHandlers(params);

        var element = params.element,
            metadata = params.metadata;

        element.setDataSource(metadata.DataSource);
        element.setAvailablePageSizes(metadata.AvailablePageSizes);
        element.setView(params.parent);

        element.setPageNumber(metadata.PageNumber);
        element.setPageSize(metadata.PageSize || 10);

        //Скриптовые обработчики на события
        //TODO: OnUpdateItems

    },

    createElement: function (params) {
        return new DataNavigation(params.parent);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.parent && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (params.parent && metadata.OnSetPageNumber){
            params.element.onSetPageNumber(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnSetPageNumber.Name);
            });
        }

        if (params.parent && metadata.OnSetPageSize){
            params.element.onSetPageSize(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnSetPageSize.Name);
            });
        }
    },

    initDataSource: function (params) {
        var self = params;

        params.element.onSetPageNumber(function (value) {
            var args = {
                source: self.element,
                dataSource: self.metadata.DataSource,
                value: value
            };

            var view = self.element.getView();
            var exchange = view.getExchange();
            exchange.send(messageTypes.onSetPageNumber, args);
        });

        params.element.onSetPageSize(function (value) {
            var args = {
                source: self.element,
                dataSource: self.metadata.DataSource,
                value: value
            };

            var view = self.element.getView();
            var exchange = view.getExchange();
            exchange.send(messageTypes.onSetPageSize, args);
        });
    }
});