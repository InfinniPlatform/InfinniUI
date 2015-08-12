var items, itemTemplate, $container;

var renderer = new ContainerPlainRenderStrategy(model, $container, viewConstructor);

renderer.setItemView(function (item) {
    var viewItem = new ListBoxItemView({
        model: model,
        item: item,
        value: model.getValueFromItem(item)
    });
})
/**
 *
 * @param {ContainerModel.Model} items
 * @param {JQuery} $container
 * @constructor
 */
function ContainerRenderStrategy(items, $container, viewConstructor) {
    this.items = items;
    this.$container = $container;

    items.onAdd(this.onAddItem.bind(this));
    items.onRemove(this.onRemoveItem.bind(this));
    items.onReplace(this.onReplaceItem.bind(this));
    items.onMove(this.onMoveItem.bind(this));
    items.onReset(this.onResetItem.bind(this));
    items.onChange(function (context, argument) {
        console.log('onChange', argument);
    });
}

ContainerRenderStrategy.prototype.renderItems = function () {
    this.renderItemsAt(this.items.toArray());
};

/**
 *
 * @param {Array} items
 * @param {index} [index = -1]
 */
ContainerRenderStrategy.prototype.renderItemsAt = function (items, index) {

};

ContainerRenderStrategy.prototype.renderItem = function () {

};

ContainerRenderStrategy.prototype.onAddItem = function () {

};

ContainerRenderStrategy.prototype.onRemoveItem = function () {

};

ContainerRenderStrategy.prototype.onReplaceItem = function () {

};

ContainerRenderStrategy.prototype.onMoveItem = function () {

};

ContainerRenderStrategy.prototype.onResetItem = function () {

};

ContainerRenderStrategy.prototype.onCahngetem = function () {

};




/**
 *
 * @constructor
 * @augments ContainerRenderStrategy
 */
function ContainerPlainRenderStrategy () {

}

ContainerPlainRenderStrategy.prototype = Object.create(ContainerRenderStrategy.prototype);
ContainerPlainRenderStrategy.prototype.constructor = ContainerPlainRenderStrategy;

var d = new ContainerPlainRenderStrategy()
