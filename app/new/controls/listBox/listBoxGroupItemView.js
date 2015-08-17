var ListBoxGroupItemView = Backbone.View.extend({

    className: "listbox__group",

    template: InfinniUI.Template["new/controls/listBox/template/listBoxGroupItem.tpl.html"],

    UI: {
        content: '.listbox-group-content'
    },

    initialize: function (options) {
        this.options = {
            item: options.item
        };
    },

    render: function () {
        var
            model = this.model,
            itemTemplate = model.get('groupItemTemplate'),
            itemsCollection = model.get('items'),
            item = this.options.item,
            $item = itemTemplate(undefined, {
                item: item,
                //index: itemsCollection.indexOf(item)
            }).render();

        this.$el.html(this.template);
        this.bindUIElements();
        this.ui.content.append($item);
        return this;
    }

});


_.extend(ListBoxGroupItemView.prototype, bindUIElementsMixin);