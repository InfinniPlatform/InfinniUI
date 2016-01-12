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
    },

    updateProperties: function() {
        ControlView.prototype.updateProperties.call(this);
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.template);
        this.updateProperties();
        this.renderButtons();
        this.trigger('render');

        this.postrenderingActions();
        return this;
    },

    renderButtons: function () {
        var
            buttons = this.model.get('_buttonsTemplate'),
            buttonsCount = this.model.get('_buttonsCount');

        var template = buttons.slice();
        var index = template.indexOf('page');
        if (index > -1) {
            for (var i = 0; i < buttonsCount - 1; i = i + 1) {
                template.splice(index, 0, 'page');
            }
        }

        this._removeChildViews();

        var buttons = template.map(function (buttonType) {
            var buttonView = this.buttonsFactory.createButton(buttonType);
            this.listenTo(buttonView, 'command', this.onCommandHandler);
            this._appendChildView(buttonView);
            return buttonView.render().$el;
        }, this);

        this.ui.buttons.append(buttons);
    },

    onCommandHandler: function () {
        console.log(arguments);
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
