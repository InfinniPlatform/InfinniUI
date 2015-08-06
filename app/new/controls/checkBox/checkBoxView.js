var CheckBoxView = ControlView.extend({

    template: InfinniUI.Template["new/controls/checkBox/template/checkBox.tpl.html"],

    UI: {
        input: 'input'
    },

    events: {
        'click input': 'onClickHandler'
    },

    initialize: function () {
        this.listenTo(this.model, 'change:value', this.onChangeValueHandler, this);
    },

    render: function () {

        this.prerenderingActions();

        this.$el.html(this.template({label: 'Label'}));
        this.bindUIElements();
        this.postrenderingActions();
        return this;
    },

    onClickHandler: function (event) {
        var checked = this.ui.input.prop('checked');
        this.model.set('value', checked);
    },

    onChangeValueHandler: function (model, value) {
        if (!this.wasRendered) {
            return;
        }

        this.ui.input.prop('checked', !!value);
    }

});
