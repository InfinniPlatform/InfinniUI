/**
 *
 * @param {ContainerModel.Model} items
 * @param {JQuery} $container
 * @param {Backbone.View}
 * @constructor
 */
function ContainerRenderStrategy(model, $container, itemViewConstructor) {
    var items = model.get('items');

    this.$items = [];
    this.model = model;
    this.items = items;
    this.$container = $container;
    this.itemViewConstructor = itemViewConstructor;

    items.onAdd(this.onAddItem.bind(this));
    items.onRemove(this.onRemoveItem.bind(this));
    items.onReplace(this.onReplaceItem.bind(this));
    items.onMove(this.onMoveItem.bind(this));
    items.onReset(this.onResetItem.bind(this));
    items.onChange(this.onChangeItem.bind(this));
}

ContainerRenderStrategy.prototype.render = function () {
    this.renderItemsAt(this.items.toArray());
};

/**
 *
 * @param {Array} items
 * @param {index} [index = -1]
 */
ContainerRenderStrategy.prototype.renderItemsAt = function (items, itemIndex) {
    var index = (typeof index === 'undefined') ? -1 : itemIndex;
    var $items = items.map(this.renderItem.bind(this));

    if (index === -1) { //Добавить представления элементов в конец
        Array.prototype.push.apply(this.$items, $items);
        this.$container.append($items);
    } else {    //Добавить представления элементов в указанную позицию
        Array.prototype.splice.apply(this.$items, [index, 0].concat($items));
        if (index === 0) {
            this.$container.prepend($items);
        } else {
            this.$items[index - 1].after($items);
        }
    }

};

ContainerRenderStrategy.prototype.renderItem = function (item) {
    var itemViewConstructor = this.itemViewConstructor;
    var itemView = new itemViewConstructor({
        model: this.model,
        item: item
    });

    return itemView.render().$el;
};

/**
 *
 * @param context
 * @param {CollectionOnAddArgument} argument
 */
ContainerRenderStrategy.prototype.onAddItem = function (context, argument) {
    this.renderItemsAt(argument.newItems, argument.newStartingIndex);
};

/**
 *
 * @param context
 * @param {CollectionOnRemoveArgument} argument
 */
ContainerRenderStrategy.prototype.onRemoveItem = function (context, argument) {
    var
        oldStartingIndex = argument.oldStartingIndex,
        oldItems = argument.oldItems;

    this.$items
        .splice(oldStartingIndex, oldItems.length)
        .forEach(function ($item) {
            $item.remove();
        });
};

ContainerRenderStrategy.prototype.onReplaceItem = function () {
    //@TODO Полностью перерисовать элементы т.к. недостаточно данных что на что поменялось
};

/**
 *
 * @param context
 * @param {CollectionOnMoveArgument} argument
 */
ContainerRenderStrategy.prototype.onMoveItem = function (context, argument) {
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
};

ContainerRenderStrategy.prototype.onResetItem = function () {
    //@TODO Перерисовать всю коллекцию элементов
};

ContainerRenderStrategy.prototype.onChangeItem = function () {
    //@TODO Любое изменение коллекции
};


/**
 *
 * @constructor
 * @augments ContainerRenderStrategy
 */
function ContainerPlainRenderStrategy() {

}

ContainerPlainRenderStrategy.prototype = Object.create(ContainerRenderStrategy.prototype);
ContainerPlainRenderStrategy.prototype.constructor = ContainerPlainRenderStrategy;

var d = new ContainerPlainRenderStrategy()
