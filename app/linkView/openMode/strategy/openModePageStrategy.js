var OpenModePageStrategy = function (linkView) {

    var openMode = InfinniUI.global.openMode;

    var containerName,
        layoutPanel;

    openMode.resolveContainer([linkView.getContainer(), 'MainContainer'], function (name, layout) {
        containerName = name;
        layoutPanel = layout;
    });

    var parentView = linkView.parentView;

    this.open = function (view, $elView) {

        var applicationView = parentView.getApplicationView();

        if (typeof applicationView === 'undefined' || applicationView === null) {
            throw new Error('Для открытия представления в режиме Page не найдено приложение');
        }

        var openView = function () {
            if (_.isEmpty(layoutPanel)) {   //Показать в корневом контейнере системы
                var $rootContainer = openMode.getRootContainer();
                $rootContainer.empty();
                $rootContainer.append($elView);
                $rootContainer.data('view', view);
            }

            messageBus.getExchange('global')
                .send(messageTypes.onViewOpened, {
                    source: linkView,
                    view: view,
                    $view: $elView,
                    container: _.isEmpty(layoutPanel) ? undefined : containerName,
                    openMode: 'Page'
                });
        };

        openMode.registerPage(applicationView, view, openView);

        subscribe(view);
        openView();
    };

    var subscribe = function (view) {
        var exchange = messageBus.getExchange('global');

        exchange.subscribe(messageTypes.onViewClosing, function (message) {
            //Обработчик запроса на закрытие представления
            if (message.view === view) {
                return view.close();
            }
        });

        exchange.subscribe(messageTypes.onViewClosed, function (message) {
            if (view !== message.view) {
                return;
            }

            var nextView = openMode.closePageView(message.view);

            ////Активировать следущую страницу приложения
            //if (nextView) {
            //    exchange.send(messageTypes.onShowView, {source: message.source, view: nextView});
            //}
        });

        exchange.subscribe(messageTypes.onShowView, function (message) {
            //Обработчик события для отображения страницы приложения приложения
            if (view !== message.view) {
                return;
            }
            var page = _.findWhere(pages, {view: message.view});

            if (typeof page !== 'undefined') {
                page.openMethod();
            }
        });
    };

};
