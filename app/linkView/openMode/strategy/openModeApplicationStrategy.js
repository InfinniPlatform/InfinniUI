var OpenModeApplicationStrategy = function (linkView) {

    var openMode = InfinniUI.global.openMode;

    var containerName;
    var layoutPanel;

    openMode.resolveContainer(['MainContainer'], function (name, layout) {
        containerName = name;
        layoutPanel = layout;
    });

    this.open = function (view, $elView) {

        view.isApplication(true);//Отмечаем представление как приложение

        view.onClosing(function () {
            //@TODO Закрыть все представления данного приложения
        });

        var openView = function () {
            if (_.isEmpty(layoutPanel)) {   //Показать в корневом контейнере системы
                var $rootContainer = openMode.getRootContainer();
                $rootContainer.empty();
                $rootContainer.append($elView);
                $rootContainer.data('view', view);
            }

            window.InfinniUI.global.messageBus
                .send(messageTypes.onViewOpened, {
                    source: linkView,
                    view: view,
                    $view: $elView,
                    container: _.isEmpty(layoutPanel) ? undefined : containerName,
                    openMode: 'Application'
                });

        };

        openMode.registerApplication(view, openView);
        subscribe(view);
        openView();
    };

    var subscribe = function (view) {
        var exchange = window.InfinniUI.global.messageBus;

        view.onClosing(function () {
            //Запросить закрытие всех представлений приложения, открытых в режиме Page и затем закрыть Application
            var pages = openMode.getPageViews(view);
            _.forEach(pages, function (page) {
                exchange.send(messageTypes.onViewClosing, {source: this, view: page});
            });
            //console.log(pages);
            //return false;
        });

        //exchange.subscribe(messageTypes.onViewClosing, function (message) {
        //    if (message.view !== view) {
        //        return;
        //    }
        //
        //    //Обработчик запроса на закрытие представления
        //    //Запросить закрытие всех представлений приложения, открытых в режиме Page и затем закрыть Application
        //
        //    view.close();
        //});

        exchange.subscribe(messageTypes.onViewClosed, function (message) {
            //Удалить приложение из списка приложений
            if (message.view !== view) {
                return;
            }

            var nextApplicationView = openMode.closeApplicationView(message.view);
            if (nextApplicationView) {
                //Активировать следущее открытое приложение
                exchange.send(messageTypes.onShowView, {
                    source: message.source,
                    view: nextApplicationView
                });
            }
        });

        exchange.subscribe(messageTypes.onShowView, function (message) {
            //Обработчик события для отображения приложения
            if (view !== message.view) {
                return;
            }

            var application = openMode.getApplication(message.view);

            if (typeof application !== 'undefined') {
                application.openMethod();
            }
        });
    };

};
