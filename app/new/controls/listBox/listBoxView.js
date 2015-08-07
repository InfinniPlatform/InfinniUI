var ListBoxView = ControlView.extend({

    template: InfinniUI.Template["new/controls/listBox/template/listBox.tpl.html"],

    UI: {
        items: '.listbox-items'
    },

    initialize: function () {
        var items = this.model.get('items');
        this.$items = [];

        items.onAdd(this.onAddItem.bind(this));
        items.onChange(function (context, argument) {
            console.log('onChange', argument);
        });
    },

    render: function () {

        this.prerenderingActions();

        this.$el.html(this.template());

        this.bindUIElements();

        this.renderItems();

        this.postrenderingActions();
        return this;
    },

    renderItems: function () {
        var model = this.model;

        var itemsCollection = model.get('items');
        var itemTemplate = model.get('itemTemplate');

        var $items = itemsCollection.toArray().map(function (item) {
            return itemTemplate(undefined, {
                item: item,
                index: itemsCollection.indexOf(item)
            }).render();
        });
        Array.prototype.push.apply(this.$items, $items);
        this.ui.items.append(this.$items);
    },

    onAddItem: function (context, argument) {
        if (!this.wasRendered) {
            return;
        }
        var newItems = argument.newItems;
        var newStartingIndex = argument.newStartingIndex;
        var model = this.model;

        var itemsCollection = model.get('items');
        var itemTemplate = model.get('itemTemplate');

        var elements = newItems.map(function (item) {
            return itemTemplate(undefined, {
                item: item,
                index: itemsCollection.indexOf(item)
            }).render();
        });

        if (newStartingIndex === -1) {
            //@TODO Добавить представления элементов в конец
            Array.prototype.push.apply(this.$items, newItems);
            this.ui.items.append(elements);
        } else {
            //@TODO Добавить представления элементов в указанную позицию
        }
    }

});
