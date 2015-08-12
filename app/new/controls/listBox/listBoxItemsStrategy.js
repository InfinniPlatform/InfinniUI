function ListBoxItemsStrategy(itemsCollection, $itemsContainer) {
    this.itemsCollection = itemsCollection;
    this.$itemsContainer = $itemsContainer;
    this.$itemsCollection = [];

    itemsCollection.onAdd(this.onAddItem.bind(this));
    itemsCollection.onRemove(this.onRemoveItem.bind(this));
    itemsCollection.onReplace(this.onReplaceItem.bind(this));
    itemsCollection.onMove(this.onMoveItem.bind(this));
    itemsCollection.onReset(this.onResetItem.bind(this));
    itemsCollection.onChange(this.onChange.bind(this));
}

ListBoxItemsStrategy.prototype.render = function () {};
ListBoxItemsStrategy.prototype.onAddItem = function () {};
ListBoxItemsStrategy.prototype.onRemove = function () {};
ListBoxItemsStrategy.prototype.onReplace = function () {};
ListBoxItemsStrategy.prototype.onMove = function () {};
ListBoxItemsStrategy.prototype.onReset = function () {};
ListBoxItemsStrategy.prototype.onChange = function () {};

/**
 * @class ListBoxGroupedItemsStrategy
 * @constructor
 */
function ListBoxGroupedItemsStrategy() {
    ListBoxItemsStrategy.apply(this, Array.prototype.slice.call(arguments));
}

ListBoxGroupedItemsStrategy.prototype = Object.create(ListBoxItemsStrategy.prototype);
ListBoxGroupedItemsStrategy.prototype.constructor = ListBoxGroupedItemsStrategy;

/**
 * @class ListBoxFlatItemsStrategy
 * @constructor
 */
function ListBoxFlatItemsStrategy() {
    ListBoxItemsStrategy.apply(this, Array.prototype.slice.call(arguments));

}

ListBoxFlatItemsStrategy.prototype = Object.create(ListBoxItemsStrategy.prototype);
ListBoxFlatItemsStrategy.prototype.constructor = ListBoxFlatItemsStrategy;

