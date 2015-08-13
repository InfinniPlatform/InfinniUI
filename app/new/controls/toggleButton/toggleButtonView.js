var ToggleButtonView = ControlView.extend(/** @lends ToggleButtonView.prototype */{

    template: InfinniUI.Template["new/controls/toggleButton/template/toggleButton.tpl.html"],

    UI: {
        textOn: '.togglebutton-label-on',
        textOff: '.togglebutton-label-off'
    },

    events: {
        'click': 'onClickHandler'
    },

    initialize: function () {
        this.once('render', this.initOnChangeHandler, this)
    },

    render: function () {
        var model = this.model;

        this.prerenderingActions();

        this.$el.html(this.template({
            textOn: model.get('textOn'),
            textOff: model.get('textOff')
        }));
        this.bindUIElements();
        this.postrenderingActions();

        this.trigger('render');
        this.onChangeValueHandler();
        return this;
    },

    onClickHandler: function (event) {
        var model = this.model;
        model.set('value', !model.get('value'));
    },

    initOnChangeHandler: function () {
        var model = this.model;

        this
            .listenTo(model, 'change:textOn', this.updateTextOn)
            .listenTo(model, 'change:textOff', this.updateTextOff)
            .listenTo(model, 'change:value', this.onChangeValueHandler);
    },

    updateTextOn: function (model, value) {
        this.ui.textOn.text(value);
    },

    updateTextOff: function (model, value) {
        this.ui.textOff.text(value);
    },

    onChangeValueHandler: function (model, value) {
        this.switchClass('toggle', value ? 'on' : 'off', this.$el);
    }

});
