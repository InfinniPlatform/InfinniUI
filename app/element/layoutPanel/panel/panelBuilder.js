function PanelBuilder() {
}

_.inherit(PanelBuilder, ElementBuilder);

_.extend(PanelBuilder.prototype, {
    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        var items = params.builder.buildMany(params.parent, params.metadata.Items, null, {parentElement: params.element});
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
        var parent = params.parent;
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (parent && metadata.OnLoaded) {
            params.element.onLoaded(function () {
                new ScriptExecutor(parent).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (parent && metadata.OnExpanded) {
            params.element.onExpanded(function () {
                new ScriptExecutor(parent).executeScript(metadata.OnExpanded.Name);
            });
        }

        if (parent && metadata.OnCollapsed) {
            params.element.onCollapsed(function () {
                new ScriptExecutor(parent).executeScript(metadata.OnCollapsed.Name);
            });
        }
    },

    createElement: function (params) {
        return new Panel(params.parent);
    }

});