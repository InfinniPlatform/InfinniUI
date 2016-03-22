function SearchPanelBuilder() {
}

_.inherit(SearchPanelBuilder, ElementBuilder);

_.extend(SearchPanelBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
        this.initValueProperty(params);
        this.initDataSource(params);

        params.element.setDataSource(params.metadata.DataSource);
        params.element.setView(params.view);
    },

    createElement: function (params) {
        return new SearchPanel(params.view);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.view && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (params.view && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnValueChanged.Name);
            });
        }
    },

    initDataSource: function (params) {
        var self = params;

        params.element.onValueChanged(function (value) {
            var args = {
                source: self.element,
                dataSource: self.metadata.DataSource,
                value: value
            };
            var view = self.element.getView();
            var exchange = view.getExchange();
            exchange.send(messageTypes.onSetTextFilter, args);
        });
    }

}, builderValuePropertyMixin);
