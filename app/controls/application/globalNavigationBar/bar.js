var GlobalNavigationBarControl = function () {
    _.superClass(GlobalNavigationBarControl, this);
};

_.inherit(GlobalNavigationBarControl, Control);

_.extend(GlobalNavigationBarControl.prototype, {
    createControlModel: function () {
        return new GlobalNavigationBarModel();
    },
    createControlView: function (model) {
        return new GlobalNavigationBarView({model: model});
    }
});

var GlobalNavigationBarModel = ControlModel.extend({
    defaults: _.defaults({}, ControlModel.prototype.defaults)
});


var GlobalNavigationBarView = ControlView.extend({

    className: 'pl-global-navigation-bar',

    UI: {
        fixed: '.pl-gn-buttons-fixed',
        pinned: '.pl-gn-buttons-pinned',
        normal: '.pl-gn-buttons-applications',
        list: '.pl-global-navigation-list',
        popup: '.pl-gn-list-container'
    },

    template: InfinniUI.Template['controls/application/globalNavigationBar/template/template.tpl.html'],

    events: {
        'click .home': 'onClickHomeHandler',
        'click .pl-global-navigation-list': 'onTogglePopupHandler'
    },

    homePageHandler: true,

    initialize: function () {
        var applications = new GlobalNavigationBarApplicationCollection();
        this.model.set('applications', applications);
        this.listenTo(applications, 'add', this.onAddApplicationHandler);
        this.listenTo(applications, 'remove', this.onRemoveApplicationHandler);

        window.applications = applications;

        this.buttons = {};
        messageBus.getExchange('global').subscribe(messageTypes.onViewOpened, this.onAddViewEventHandler.bind(this));
    },

    /**
     * @description Обработчик добавления данных о приложении в список приложений
     * @param application
     */
    onAddApplicationHandler: function (application, applications) {
        var appId = application.get('appId');
        var pinned = application.get('pinned');
        var home = application.get('home');
        var view = application.get('view');

        view.onTextChange(function () {
            applications.trigger('onTextChange');
        });

        this.listenTo(application, 'change:pinned', this.onChangePinnedHandler);

        var button = new GlobalNavigationBarApplicationView({model: application});

        this.buttons[appId] = button;

        var $container;
        $container = this.ui.normal;
        //
        //if (home) {
        //    $container = this.ui.fixed;
        //} else {
        //    $container = pinned ? this.ui.pinned : this.ui.normal;
        //}
        var $el = button.render().$el;
        $container.append($el);
        view.onTextChange(function ($el, view) {
            $el.find('.pl-gn-button-link > span').text(view.getText());
        }.bind(this, $el, view));

        this.listenTo(application, 'application:close', this.onCloseApplication);
        this.listenTo(application, 'application:active', this.onActiveApplication);

        this.setActiveApplication(appId);
    },

    onRemoveApplicationHandler: function (application) {
        var appId = application.get('appId');
        var button = this.buttons[appId];
        button.remove();
    },

    setActiveApplication: function (appId) {
        var applications = this.model.get('applications');
        var application = applications.findWhere({appId: appId});
        /** @TODO Скрыть другие приложения, показать выбранное приложение **/

        /** @TODO Отрефакторить! Нужно сделать ч/з getApplicationView **/
        $('#page-content').find('[data-app-id]').hide();
        $('#page-content').find('[data-app-id="' + appId + '"]').show();

        var button = this.buttons[appId];
        this.setActiveButton(appId);
    },


    onActiveApplication: function (application) {
        this.setActiveApplication(application.get('appId'));
        this.toggleList(false);
    },

    /**
     * @description Обработчик нажатия кнопки закрытия вкладки приложения
     * @param application
     */
    onCloseApplication: function (application) {
        var appId = application.get('appId');
        this.closeApplication(appId);
        this.toggleList(false);
    },

    /**
     * @description Закрытие приложения
     * @param appId
     */
    closeApplication: function (appId) {
        var application = applications.findWhere({appId: appId});
        var activeBar = application.get('activeBar');
        activeBar.closingViews(this.closingApplicationView.bind(this, appId));
    },

    /**
     * #description Закрытие представления приложения
     * @param appId
     */
    closingApplicationView: function (appId) {
        var application = applications.findWhere({appId: appId});
        var view = application.get('view');
        var exchange = messageBus.getExchange('global');

        var message = {appId: appId, viewId: application.get('viewId')};
        exchange.send(messageTypes.onViewClosing, message);
    },

    /**
     * Установка признака активности кнопки преключения указанного приложения
     * @param button
     */
    setActiveButton: function (appId) {
        _.each(this.buttons, function (btn, id) {
            btn.model.set('active', id === appId);
        });
    },

    /**
     * @description Обработчик изменения признака закрепления кнопки на панели задач. Перемещает кнопку в нужный раздел
     * @param application
     * @param {Boolean} pinned
     */
    onChangePinnedHandler: function (application, pinned) {
        var appId = application.get('appId');
        var button = this.buttons[appId];
        //var $container = pinned ? this.ui.pinned : this.ui.normal;
        var $container = this.ui.normal;
        button.$el.detach().appendTo($container);
    },

    /**
     * @description Обработчик открытия представления.
     * @param message
     */
    onAddViewEventHandler: function (message) {
        var activeBar;
        var applications = this.model.get('applications');
        var application = applications.add({
            name: message.view.getText(),
            appId: message.appId,
            viewId: message.viewId,
            view: message.view,
            home: this.homePageHandler
        });


        if (this.homePageHandler) {
            this.homePageHandler = false;
        } else {
            activeBar = new ActiveBarControl(message.appId, message.view, message.viewId);
            application.set('activeBar', activeBar, {silent: true});
            message.container.prepend(activeBar.render());
            this.show(message.appId);
        }

        var exchange = messageBus.getExchange('global');
        exchange.subscribe(messageTypes.onViewClosed, this.onViewClosedHandler.bind(this, message.appId));

        //exchange.subscribe(messageTypes.onViewClosing, this.closingApplicationView.bind(this, message.appId));
    },

    /**
     * @description Обработчик закрытия представления приложения
     * @param appId
     * @param message
     */
    onViewClosedHandler: function (appId, message) {
        var applications = this.model.get('applications');
        var application = applications.findWhere({appId: appId});
        var activeBar;

        if (application && message.viewId === application.get('viewId')) {
            activeBar = application.get('activeBar');
            applications.remove(application);
            activeBar.remove();
            // @TODO Активировать соседнее приложение
            application = applications.last(1).pop();
            this.setActiveApplication(application.get('appId'));
        }

    },

    show: function (appId) {
        if (_.isEmpty(appId)) {
            alert('appId is null');
            return;
        }

        this.setActiveButton(appId);


    },

    hide: function (appId, appIdActive) {
        if (_.isEmpty(appId)) {
            alert('appId is null');
            return;
        }
        if (_.isEmpty(appIdActive)) {
            appIdActive = this.$el.find('.navbar-nav li:first a').data('app-anchor');
        }

        $('#page-content').find('[data-app-id]').hide();
        $('#page-content').find('[data-app-id="' + appId + '"]').remove();
        $('#page-content').find('[data-app-id="' + appIdActive + '"]').show();
    },

    render: function () {
        this.$el.html(this.template({}));
        this.bindUIElements();

        var list = new GlobalNavigationPopup({collection: this.model.get('applications')});

        this.ui.popup.append(list.render().$el);
        return this;
    },

    /**
     * Обработка нажатия ссылки переходна на домашнюю страницу
     * @param event
     */
    onClickHomeHandler: function (event) {

    },

    onTogglePopupHandler: function (event) {
        event.preventDefault();
        this.toggleList();
    },

    toggleList: function (show) {
        if (typeof show === 'boolean') {
            this.ui.popup.toggleClass('hidden', !show);
        } else {
            this.ui.popup.toggleClass('hidden');
        }

    }

});