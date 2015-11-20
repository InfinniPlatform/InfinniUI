var OpenModeContainerStrategy = function (linkView) {

    var openMode = InfinniUI.global.openMode;

    var containerName,
        layoutPanel;

    openMode.resolveContainer([linkView.getContainer(), 'MainContainer'], function (name, layout) {
        containerName = name;
        layoutPanel = layout;
    });

    this.open = function (view, $elView) {

        if (_.isEmpty(layoutPanel)) {//Отобразить в корневом контейнере
            var $rootContainer = openMode.getRootContainer();
            var oldView = $rootContainer.data('view');
            if (typeof oldView !== 'undefined' && oldView !== null) {
                oldView.close();
            }
            $rootContainer.empty();
            $rootContainer.append($elView);
            $rootContainer.data('view', view);
        } else {//Есть элемент с указанным именем
            window.InfinniUI.global.messageBus
                .send(messageTypes.onViewOpened, {
                    source: linkView,
                    view: view,
                    $view: $elView,
                    container: containerName,
                    openMode: "Container"
                });
        }
    };

    var subscribe = function (view) {
        var exchange = window.InfinniUI.global.messageBus;

        exchange.subscribe(messageTypes.onViewClosing, function (message) {
            if (message.view !== view) {
                return;
            }
            view.close();
        });
    };
};