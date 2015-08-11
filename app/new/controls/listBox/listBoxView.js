var ListBoxView = ControlView.extend({

    template: InfinniUI.Template["new/controls/listBox/template/listBox.tpl.html"],

    UI: {
        items: '.listbox-items'
    },

    //ListEditorBase
    applyItemStrategy: function () {

    },

    initialize: function () {
        var items = this.model.get('items');
        this.$items = [];

        //@TODO Вынести в ContainerView??
        items.onAdd(this.onAddItem.bind(this));
        items.onRemove(this.onRemoveItem.bind(this));
        items.onReplace(this.onReplaceItem.bind(this));
        items.onMove(this.onMoveItem.bind(this));
        items.onReset(this.onResetItem.bind(this));
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

    renderItems: function (items, index) {
        if (!this.wasRendered) {
            return;
        }
        var model = this.model;
        var itemTemplate = model.get('itemTemplate');
        var itemsCollection = model.get('items');

        if (typeof items === 'undefined') {
            items = itemsCollection.toArray();
        }

        if (typeof index === 'undefined') {
            index = -1;
        }

        var $items = items.map(this.renderItem.bind(this));

        if (index === -1) { //Добавить представления элементов в конец
            Array.prototype.push.apply(this.$items, $items);
            this.ui.items.append($items);
        } else {    //Добавить представления элементов в указанную позицию
            Array.prototype.splice.apply(this.$items, [index, 0].concat($items));
            if (index === 0) {
                this.ui.items.prepend($items);
            } else {
                this.$items[index - 1].after($items);
            }
        }
    },

    renderItem: function (item) {
        var model = this.model;

        var viewItem = new ListBoxItemView({model: model, item: item});
        return viewItem.render().$el;
    },

    onAddItem: function (context, argument) {
        if (!this.wasRendered) {
            return;
        }
        var newItems = argument.newItems;
        var newStartingIndex = argument.newStartingIndex;
        this.renderItems(newItems, newStartingIndex);
    },

    onRemoveItem: function (context, argument) {
        var
            oldStartingIndex = argument.oldStartingIndex,
            oldItems = argument.oldItems;

        if (!this.wasRendered) {
            return;
        }

        this.$items
            .splice(oldStartingIndex, oldItems.length)
            .forEach(function ($item) {
                $item.remove();
            });
    },

    onReplaceItem: function (context, argument) {
        //@TODO Полностью перерисовать элементы т.к. недостаточно данных что на что поменялось

    },

    onMoveItem: function (context, argument) {
        var
            oldItems = argument.oldItems,
            oldStartingIndex = argument.oldStartingIndex,
            newStartingIndex = argument.newStartingIndex;

        if (!this.wasRendered) {
            return;
        }

        var $items = this.$items.splice(oldStartingIndex, oldItems.length);
        Array.prototype.splice.apply(this.$items, [newStartingIndex, 0].concat($items));
        //#TODO Перенести DOM элементы на новые места
    },

    onResetItem: function (context, argument) {
        //@TODO Перерисовать всю коллекцию элементов

    }

});
