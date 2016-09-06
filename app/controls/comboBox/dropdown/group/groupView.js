var ComboBoxGroupView = Backbone.View.extend({

    template: InfinniUI.Template["controls/comboBox/dropdown/group/template/template.tpl.html"],

    UI: {
        header: '.pl-combobox-group__header',
        items: '.pl-combobox-group__items'
    },

    initialize: function (options) {
        this.options = {
            header: options.header,
            items: options.items
        };

    },

    render: function () {
        var options = this.options;
        this.$el.html(this.template());
        this.bindUIElements()
        this.ui.header.append(options.header);
        this.ui.items.append(options.items);

        //devblockstart
        window.InfinniUI.global.messageBus.send('render', {element: this});
        //devblockstop

        return this.$el;
    }

});

_.extend(ComboBoxGroupView.prototype, bindUIElementsMixin);
