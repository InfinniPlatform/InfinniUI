var DataGridBodyCheckBoxCell = Backbone.View.extend({

    tagName: 'td',

    template: InfinniUI.Template['controls/dataGrid/template/cells/bodyCheckBoxCell.tpl.html'],

    UI: {
        container: 'div'
    },

    initialize: function () {
        this.checkbox = new CheckBox();
        this.checkbox.onValueChanged(this.onClickHandler.bind(this));
    },

    onClickHandler: function () {
        this.trigger('check', this.checkbox.getValue());
    },

    render: function () {
        this.$el.html(this.template());
        this.bindUIElements();
        this.ui.container.append(this.checkbox.render());

        return this;
    },

    check: function (value) {
        this.checkbox.setValue(value);
    }
});

_.extend(DataGridBodyCheckBoxCell.prototype, bindUIElementsMixin);
