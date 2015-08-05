function ListBox(parent) {
    _.superClass(ListBox, this, parent);

    this.initItemsEvents();
}

_.inherit(ListBox, ListEditorBase);

ListBox.prototype.initItemsEvents = function () {
    var itemsCollection = this.getItems();
    itemsCollection.onAdd(this.onAddItem.bind(this));
};

ListBox.prototype.onAddItem = function (context, argument) {
    var newItems = argument.newItems;
    var newStartingIndex = argument.newStartingIndex;
    var itemsCollection = this.getItems();

    var elements = newItems.map(function (item) {
        var itemTemplate = this.getItemTemplate();
        return itemTemplate(undefined, {
            item: item,
            index: itemsCollection.indexOf(item)
        });
    }, this);

    if (newStartingIndex === -1) {
        //@TODO Добавить представления элементов в конец
    } else {
        //@TODO Добавить представления элементов в указанную позицию
    }
};

ListBox.prototype.createControl = function () {
    return new ListBoxControl();
};