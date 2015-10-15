var PopupButtonView = ContainerView.extend({

    className: 'pl-popup-button',

    template: InfinniUI.Template["new/controls/popupButton/template/popupButton.tpl.html"],

    events: {
        'click .pl-popup-button__grip': 'onClickGripHandler',
        'click .pl-popup-button__button': 'onClickHandler'
    },

    UI: {
        button: '.pl-popup-button__button'
    },

    onClickGripHandler: function (event) {
        var model = this.model;
        var strategy = new PopupButtonViewPlainStrategy(this);


        var dropdown = new PopupButtonDropdown({
            content: strategy.render(),
            x: event.clientX,
            y: event.clientY
        });

        $('body').append(dropdown.render().$el);
        this.listenTo(dropdown, 'close', function () {
            dropdown.remove();
        })
    },

    initialize: function (options) {
        ContainerView.prototype.initialize.call(this, options);
    },

    initOnChangeHandler: function () {
        ContainerView.prototype.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:enabled', this.OnChangeEnabledHandler)
            .listenTo(this.model, 'change:content', this.onChangeContentHandler);
    },

    onChangeContentHandler: function (model, value) {
        this.ui.button.html(this.getRenderedContent());
    },

    getRenderedContent: function () {
        var model = this.model;
        var content = model.get('content');

        if (typeof content === 'function') {
            return content.call(null, null, {}).render();
        }
        return '';
    },

    getData: function () {
        var model = this.model;
        var content = model.get('content');

        return _.extend({},
            ControlView.prototype.getData.call(this),
            {
                content: this.getRenderedContent()
            }
        );
    },

    onClickHandler: function (event) {
        this.trigger('onClick');
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.template);

        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    updateGrouping: function(){}

});
