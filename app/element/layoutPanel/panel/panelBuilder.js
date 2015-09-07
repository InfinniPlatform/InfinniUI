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

        if (parent && metadata.OnExpanded) {
            params.element.onExpanded(function () {
                var message = this.getBaseMessage(params);
                new ScriptExecutor(parent).executeScript(metadata.OnExpanded.Name, message);
            }.bind(this));
        }

        if (parent && metadata.OnCollapsed) {
            params.element.onCollapsed(function () {
                var message = this.getBaseMessage(params);
                new ScriptExecutor(parent).executeScript(metadata.OnCollapsed.Name, message);
            }.bind(this));
        }
    },

    createElement: function (params) {
        return new Panel(params.parent);
    }

});