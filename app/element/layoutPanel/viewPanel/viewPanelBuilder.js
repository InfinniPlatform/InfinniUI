function ViewPanelBuilder() {
}

_.inherit(ViewPanelBuilder, ElementBuilder);

_.extend(ViewPanelBuilder.prototype, {
    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var builder = params.builder;
        var panel = params.element;
        var metadata = params.metadata;

        /* Костыль для обработки OpenMode = Inline */
        if (_.isEmpty(metadata.Name)) {
            metadata.Name = guid();
            panel.setName(metadata.Name);
        }

        this.registerLayoutPanel(params);

        if (typeof metadata.View !== 'undefined' && metadata.View !== null) {
            var linkView = builder.build(params.view, metadata.View);

            var onOpening = function (layout) {
                panel.setLayout(layout);
            };

            if (typeof linkView !== 'undefined' && linkView !== null) {

                /* Костыль для обработки OpenMode = Inline */
                if (linkView.getOpenMode() === 'Inline') {
                    linkView.setOpenMode('Container');
                    linkView.setContainer(metadata.Name);
                }

                linkView.createView(function (view) {
                    var editDataSource = _.find(view.getDataSources(), function (ds) {
                        return isMainDataSource(ds);
                    });
                    //editDataSource.suspendUpdate();
                    //editDataSource.setEditMode();

                    view.onOpening(onOpening);
                    view.open();
                    //Последним обработчиком в очередь добавляется метод, генерирующий событие View.onLoad
                    //view.getExchange().subscribe(messageTypes.onLoaded, view.loaded);
                    //view.getExchange().send(messageTypes.onLoaded, {});
                });
            }
        }

        window.InfinniUI.global.messageBus.subscribe(messageTypes.onViewOpened,
            this.onViewOpened.bind(this, params));

    },

    /**
     * @param params {Object}
     * @param message.view {View}
     * @param message.$view {JQuery}
     * @param message.container {String} Имя контейнера
     * @param message.openMode {String} Режим открытия
     */
    onViewOpened: function (params, message) {
        var element = params.element;

        if (message.container !== element.getName()) {
            return;
        }
        var layout = element.getLayout();
        if (layout) {
            var view = layout.data('view');
            var openMode = layout.data('openMode');
            if (view === message.view) {
                return;
            }


            if (openMode === 'Container') {
                //закрываем предыдущее представление
                view.close();
            } else if (typeof view !== 'undefined') {
                //удаляем из DOM
                layout.detach();
            }

        }

        layout = message.$view;
        view = message.view;
        layout.data('view', view);
        layout.data('openMode', message.openMode);
        element.setLayout(layout);
    },

    createElement: function (params) {
        return new ViewPanel(params.view);
    }
},
    builderLayoutPanelMixin
);
