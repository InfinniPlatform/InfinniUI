function GlobalNavigationBarBuilder() {

}

_.inherit(GlobalNavigationBarBuilder, ElementBuilder);

_.extend(GlobalNavigationBarBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var element = params.element;

        element.setApplications(InfinniUI.global.openMode.getApplicationViews());
        var exchange = this.getGlobalMessageBus();
        exchange.subscribe(messageTypes.onViewOpened, this.onViewOpenedHandler.bind(this, params));

        exchange.subscribe(messageTypes.onViewClosed, this.onViewClosedHandler.bind(this, params));
        exchange.subscribe(messageTypes.onViewTextChange, this.onViewTextChangeHandler.bind(this, params));


        element.onActivateApplication(this.onActivateApplicationHandler.bind(this, params));
        element.onClosingApplication(this.onClosingApplicationHandler.bind(this, params));
    },

    getGlobalMessageBus: function () {
        return window.InfinniUI.global.messageBus;
    },

    /**
     * @description Обработчик запроса на закрытие представления от панели навигации
     * @param params
     * @param view
     */
    onClosingApplicationHandler: function (params, view) {
        view.close();
    },

    /**
     * @description Обработчик события переключения на другое приложение
     * @param params
     */
    onActivateApplicationHandler: function (params, view) {
        //@TODO Отправить в шину сообщение о необходимости активировать указанное приложение
        var exchange = this.getGlobalMessageBus();
        exchange.send(messageTypes.onShowView, {source: this, view: view});
    },

    /**
     * @description Обработчик события открытия представления
     */
    onViewOpenedHandler: function (params, message) {
        var element = params.element;

        if (message.openMode !== 'Application') {
            return;
        }

        console.log('messageTypes.onViewOpened', arguments);
        element.addApplicationView(message.view)

    },

    /**
     * @description Обработчик события закрытия представления
     */
    onViewClosedHandler: function (params, message) {
        console.log('messageTypes.onViewClosing', message);
        params.element.removeApplicationView(message.view)
    },

    /**
     * @description При изменении заголовка представления, уведомляем об этом компонент навигации
     * @param params
     */
    onViewTextChangeHandler: function (params, message) {
        params.element.setApplicationText(message.source, message.value);
    },

    createElement: function (params) {
        return new GlobalNavigationBar(params.view);
    }

});