var ListBoxView = ControlView.extend({

    template: '<div></div>',

    initialize: function () {
        var items = this.model.get('items');
        items.onAdd(this.onAddItem.bind(this));
    },

    render: function () {

        this.prerenderingActions();

        this.$el.html(this.template());

        this.bindUIElements();
        this.postrenderingActions();
        return this;
    },

    onAddItem: function (context, argument) {
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
        } else {
            //@TODO Добавить представления элементов в указанную позицию
        }
    }

});
