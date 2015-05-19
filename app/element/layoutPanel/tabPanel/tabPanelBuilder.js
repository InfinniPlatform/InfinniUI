function TabPanelBuilder() {
}

_.inherit(TabPanelBuilder, ElementBuilder);

_.extend(TabPanelBuilder.prototype, {

    applyMetadata: function(params){
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var metadata = params.metadata;

        params.element.setHeaderLocation(metadata.HeaderLocation || 'Top');
        params.element.setHeaderOrientation(metadata.HeaderOrientation || 'Horizontal');
        params.element.setDefaultPage(metadata.DefaultPage);

        this.initScriptsHandlers(params);

        _.each(metadata.Pages, function (metadataItem) {
            params.element.addPage(params.builder.buildType(params.parent, 'TabPage', metadataItem));
        });


        params.element.onSelectionChanged(function() {
            var exchange = messageBus.getExchange('global');
            exchange.send('OnChangeLayout', {});//Генерация события для пересчета расположения элементов формы
        });

    },

    createElement: function(params){
        return new TabPanel(params.parent);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события

        if (params.parent && metadata.OnSelectionChanged){
            params.element.onSelectionChanged(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnSelectionChanged.Name);
            });
        }
    }

});
