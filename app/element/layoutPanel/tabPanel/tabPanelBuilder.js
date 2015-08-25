function TabPanelBuilder() {
}

_.inherit(TabPanelBuilder, ElementBuilder);

_.extend(TabPanelBuilder.prototype, {

    applyMetadata: function(params){
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var metadata = params.metadata;

        this.registerLayoutPanel(params);

        params.element.setHeaderLocation(metadata.HeaderLocation || 'Top');
        params.element.setHeaderOrientation(metadata.HeaderOrientation || 'Horizontal');
        params.element.setDefaultPage(metadata.DefaultPage);

        this.initScriptsHandlers(params);

        _.each(metadata.Pages, function (metadataItem) {
            var tabPage = params.builder.buildType(params.view, 'TabPage', metadataItem);
            tabPage.onClosed(function (page) {
                params.element.removePage(page);
            });
            params.element.addPage(tabPage);


        });


        params.element.onSelectionChanged(function() {
            var exchange = messageBus.getExchange('global');
            exchange.send('OnChangeLayout', {});//Генерация события для пересчета расположения элементов формы
        });

        messageBus.getExchange('global').subscribe(messageTypes.onViewOpened,
            this.onViewOpened.bind(this, params));

    },

    /**
     * @param params {Object}
     * @param message.view {View}
     * @param message.$view {JQuery}
     * @param message.container {String} Имя контейнера
     * @param message.openMode {String} Режим открытия
     * @param message.applicationView {View}
     */
    onViewOpened: function (params, message) {
        var element = params.element;

        if (message.container !== element.getName()) {
            return;
        }

        if (message.applicationView && params.view.getApplicationView() !== message.applicationView) {
            return;
        }

        var tabPage = params.builder.buildType(params.view, 'TabPage', {
            Text: message.view.getText(),
            Enabled: true,
            Visible: true,
            CanClose: true
        });

        tabPage.onClosing(function () {
            //@TODO Добавить проверку на возможность закрытия представления view, открытого в режиме Page
        });

        tabPage.onClosed(function (page) {
            var exchange = messageBus.getExchange('global');
            exchange.send(messageTypes.onViewClosing, {sourсe: this, view: view});
        });

        message.view.onClosed(function () {
            params.element.removePage(tabPage);
        });

        var layout = message.$view;
        var view = message.view;

        tabPage.setLayoutPanel(view.getLayoutPanel());
        params.element.addPage(tabPage);
        params.element.setSelectedPage(tabPage);


            //layout.data('view', view);
        layout.data('openMode', message.openMode);
    },

    createElement: function(params){
        return new TabPanel(params.view);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события

        if (params.view && metadata.OnSelectionChanged){
            params.element.onSelectionChanged(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnSelectionChanged.Name);
            });
        }
    }

},
    builderLayoutPanelMixin
);
