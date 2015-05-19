function BaseItemAction(view) {

    var baseAction = new BaseAction();

    var selectedItem = null;

    // TODO
    var context = null;

    baseAction.getSelectedItem = function () {
        return selectedItem;
    };

    var eventStore = new EventStore();
    baseAction.onSetSelectedItem = function (handler) {
        eventStore.addEvent('onSetSelectedItem', handler);
    };
    baseAction.onValueChanged = function (handler) {
        eventStore.addEvent('onValueChanged', handler);
    };
    baseAction.onItemAdded = function (handler) {
        eventStore.addEvent('onItemAdded', handler);
    };
    baseAction.onItemRemoved = function (handler) {
        eventStore.addEvent('onItemRemoved', handler);
    };

    baseAction.setSelectedItem = function (value) {
        if (value !== selectedItem) {
            selectedItem = value;
            eventStore.executeEvent('onSetSelectedItem', context, { value: selectedItem });
        }
    };

    var items = [];

    baseAction.getItems = function () {
        return items;
    };

    baseAction.setItems = function (value) {
        items = value || [];
    };

    baseAction.addItem = function (value) {
        items.push(value);

        eventStore.executeEvent('onValueChanged', context, { value: items });
        eventStore.executeEvent('onItemAdded', context, { value: value });
    };

    baseAction.replaceItem = function (oldItem, newItem) {
        var index = findItem(items, oldItem);

        var itemsRemove = items.slice();
        itemsRemove.splice(index, 1);

        eventStore.executeEvent('onValueChanged', context, { value: itemsRemove });

        if (index !== -1) {
            items[index] = newItem;
        }

        eventStore.executeEvent('onValueChanged', context, { value: items });

        /*TODO добавить вызов обработчика replaceItem*/
    };

    baseAction.getView = function () {
        return view;
    };

    baseAction.removeItem = function (item) {
        var index = findItem(items, item);

        if (index !== -1) {
            items.splice(index, 1);
            eventStore.executeEvent('onValueChanged', context, { value: items });
            eventStore.executeEvent('onItemRemoved', context, { value: item });
        }
    };

    var findItem = function (array, item) {
        for (var i = 0; i < items.length; i++) {
            if (items[i] === item) {
                return i;
            }
        }
        return -1;
    };

    return baseAction;
}