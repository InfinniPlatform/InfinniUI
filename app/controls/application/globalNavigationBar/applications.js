var GlobalNavigationBarApplicationModel = Backbone.Model.extend({

    defaults: {
        appId: null,
        viewId: null,
        name: null,
        pinned:false,
        active: false,
        home: false
    }

});

var GlobalNavigationBarApplicationCollection = Backbone.Collection.extend({
    model: GlobalNavigationBarApplicationModel,

    initialize: function () {
        this.on('add', this.onAddHandler, this);
    },

    onAddHandler: function (model) {
        this.listenTo(model, 'change:active', this.onChangeModelHandler.bind(this));
    },

    onChangeModelHandler: function (model, value) {
        var index = this.indexOf(model);
        var button;

        if (value === true) {
            for (var i = 0; i < this.length; i = i + 1) {
                button = this.at(i);
                button.set('before-active', i === index - 1);
                button.set('after-active', i === index + 1);
                button.set('last', this.length === i + 1);
            }
        }
    }

});


var GlobalNavigationBarApplicationView = Backbone.View.extend({

    className: 'pl-gn-button',

    tagName: 'div',

    template: {
        home: InfinniUI.Template['controls/application/globalNavigationBar/template/button/home.tpl.html'],
        pinned: InfinniUI.Template['controls/application/globalNavigationBar/template/button/pinned.tpl.html'],
        normal: InfinniUI.Template['controls/application/globalNavigationBar/template/button/normal.tpl.html']
    },

    activeClass: 'pl-active',

    UI: {
        link: '.pl-gn-button-link',
        close: '.pl-gn-button-close'
    },

    events: {
        'click .pl-gn-button-link': 'onClickLinkHandler',
        'click .pl-gn-button-close': 'onClickCloseHandler'
    },

    onClickLinkHandler: function (event) {
        this.model.trigger('application:active', this.model);
        event.preventDefault();
    },

    onClickCloseHandler: function (event) {
        this.model.trigger('application:close', this.model);
        event.preventDefault();
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.onChangeHandler);
    },

    render: function () {
        var model = this.model;
        var pinned = model.get('pinned');
        var active = model.get('active');
        var home = model.get('home');
        var view = model.get('view');
        var template;

        if (home === true) {
            template = this.template.home;
        } else {
            template = pinned ? this.template.pinned : this.template.normal;
        }

        this.$el.html(template({
            appId: model.get('appId'),
            name: view.getText()
        }));

        this.$el.toggleClass('pl-before-active', !!model.get('before-active'));
        this.$el.toggleClass('pl-after-active', !!model.get('after-active'));
        this.$el.toggleClass('last', !!model.get('last'));
        this.$el.toggleClass(this.activeClass, active);
        this.$el.toggleClass(this.activeClass, active);
        this.$el.toggleClass('pl-gn-button-home', home);

        this.bindUIElements();
        this.delegateEvents();

        return this;
    },

    onChangeHandler: function () {
        //При ищменении атрибутов приложения - перерисовка кнопки
        this.render();
    }

});

_.extend(GlobalNavigationBarApplicationView.prototype, bindUIElementsMixin);
