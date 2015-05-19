function ViewPanelBuilder() {
}

_.inherit(ViewPanelBuilder, ElementBuilder);

_.extend(ViewPanelBuilder.prototype, {
    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var builder = params.builder;
        var panel = params.element;
        var metadata = params.metadata;

        var linkView = builder.build(params.parent, metadata.View);

        var onOpening = function (layout) {
            panel.setLayout(layout);
        };

        if (typeof linkView !== 'undefined' && linkView !== null) {
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

    },

    createElement: function (params) {
        return new ViewPanel(params.parent);
    }
});
