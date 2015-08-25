function PanelBuilder() {
}

_.inherit(PanelBuilder, ElementBuilder);

_.extend(PanelBuilder.prototype, {
    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        var items = params.builder.buildMany(params.view, params.metadata.Items);
        if (items) {
            _.each(items, function (item) {
                params.element.addItem(item);
            });
        }

        params.element.setText(params.metadata.Text);
        params.element.setCollapsible(params.metadata.Collapsible);
        params.element.setCollapsed(params.metadata.Collapsed);
    },

    initScriptsHandlers: function (params) {
        var view = params.view;
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (view && metadata.OnLoaded) {
            params.element.onLoaded(function () {
                new ScriptExecutor(view).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (view && metadata.OnExpanded) {
            params.element.onExpanded(function () {
                new ScriptExecutor(view).executeScript(metadata.OnExpanded.Name);
            });
        }

        if (view && metadata.OnCollapsed) {
            params.element.onCollapsed(function () {
                new ScriptExecutor(view).executeScript(metadata.OnCollapsed.Name);
            });
        }
    },

    createElement: function (params) {
        return new Panel(params.view);
    }

});