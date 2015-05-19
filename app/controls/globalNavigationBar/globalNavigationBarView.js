var GlobalNavigationBarView = ControlView.extend({

    className: 'pl-global-navigation-bar',

    UI: {
        buttons: '.pl-gn-buttons'
    },

    template: InfinniUI.Template["controls/globalNavigationBar/template/template.tpl.html"],

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.listenTo(this.model, 'change:applications', this.onChangeApplicationsHandler);
        this.listenTo(this.model, 'change:active', this.onChangeActiveHandler);
        this.model.set('buttons', []);
        this.model.set('list', []);
    },

    onChangeApplicationsHandler: function () {
        //@TODO Обновить список приложений (кнопки выбора и список)
        var applications = this.model.get('applications');
        this.renderApplications();
    },

    onChangeActiveHandler: function () {
        var buttons = this.model.get('buttons');

        var active = this.model.get('active');

        var index = _.findIndex(buttons, function (button) {
            return button.getKey() == active;
        });

        var button;
        for (var i = 0, ln = buttons.length; i < ln; i = i + 1) {
            button = buttons[i];
            button.$el.toggleClass('pl-before-active', i + 1 === index);
            button.$el.toggleClass('pl-after-active', i === index + 1);
            button.$el.toggleClass('last', i === ln - 1);
        }
    },

    render: function () {

        this.$el.html(this.template({}));
        this.bindUIElements();

        this.renderApplications();
        return this;
    },

    renderApplications: function () {
        this.renderButtons();
        this.renderList();
    },

    renderButtons: function () {
        //@TODO Рендеринг список кнопок выбора приложений
        var applications = this.model.get('applications');

        var control = this;

        var buttons = this.model.get('buttons');

        _.forEach(buttons, function (button) {
            button.remove();
        });


        if (_.isEmpty(applications)) {
            return;
        }

        var active = this.model.get('active');


        buttons = _.map(applications, function (app){
            var button = new GlobalNavigationBarButtonView({
                key: app.getGuid(),
                text: app.getText() || app.getGuid(),
                active: app.getGuid() === active
            });

            button.listenTo(this.model, 'application:text', function (data) {
                if (app.getGuid() === data.key) {
                    this.setText(data.text);
                }
            });

            button.listenTo(this.model, 'change:active', function (model, active) {
                button.setActive(active);
            });

            this.listenTo(button, 'application:closing', function () {
                control.trigger('application:closing', app);
            });

            this.listenTo(button, 'application:activate', function () {
                control.trigger('application:activate', app);
            });




            button.onClick(this.onActivateApplicationHandler);
            //this.$el.append(button.render().$el);
            this.ui.buttons.append(button.render().$el);
            return button;
        }, this);

        this.model.set('buttons', buttons);

    },

    onActivateApplicationHandler: function (key) {
        var applications = this.model.get('applications');

        var app = _.find(applications, function (app) {
            return app.getGuid() === key;
        });

        if (typeof app !== 'undefined') {
            this.trigger('application:activate', app);
        }
    },


    renderList: function () {
        //@TODO Рендеринг выпадающего списка приложений
    }

});