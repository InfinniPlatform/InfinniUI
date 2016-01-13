var DataNavigationView = ControlView.extend({

    template: InfinniUI.Template["new/controls/dataNavigation/template/dataNavigation.tpl.html"],

    className: 'pl-data-navigation',

    UI: {
        buttons: 'ul'
    },

    initialize: function (options) {
        ControlView.prototype.initialize.call(this, options);
        this._childViews = [];
        this.buttonsFactory = new DataNavigationButtonFactory(this);
    },

    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:pageStart', this.updateButtons);
    },

    updateProperties: function() {
        ControlView.prototype.updateProperties.call(this);
        this.updateButtons();
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.template);
        this.updateProperties();
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    renderButtons: function () {
        var
            template = this.model.get('_buttonsTemplate'),
            buttonsCount = this.model.get('_buttonsCount'),
            buttons;

        this._removeChildViews();

        var
            buttonsFactory = this.buttonsFactory,
            model = this.model;

        buttons = template.reduce(function (buttons, buttonType) {
            if (buttonType === 'page') {
                var pageNumber = model.get('pageNumber');
                var pageStart = model.get('pageStart');
                for (var i = 0; i < buttonsCount; i = i + 1) {
                    var button = buttonsFactory.createButton(buttonType, {pageNumber: pageStart + i});
                    buttons.push(button)
                }
            } else {
                var button = buttonsFactory.createButton(buttonType);
                buttons.push(button);
            }

            return buttons;
        }, []);

        var $buttons = buttons.map(function (button) {
            this.listenTo(button, 'command', this.onCommandHandler);
            this._appendChildView(button);
            return button.render().$el;
        }, this);

        this.ui.buttons.append($buttons);
    },

    updateButtons: function () {
        this.renderButtons()
    },

    onCommandHandler: function (name, options) {
        switch (name) {
            case "prev":
                this.model.prevPage();
                break;
            case "next":
                this.model.nextPage();
                break;
            case "page":
                this.model.set('pageNumber', options.pageNumber);
                break;
        }
    },

    _removeChildViews: function () {
        this._childViews.forEach(function (view) {
            this.stopListening(view);
            view.remove();
        }, this);
        this._childViews.length = 0;
    },

    _appendChildView: function (view) {
        this._childViews.push(view);
    }

});
