/**
 * @constructor
 * @extends ContainerRenderStrategy
 */
function ListEditorBaseGroupedRenderStrategy(model, $container, itemViewConstructor, groupViewConstructor) {
    ContainerRenderStrategy.call(this, model, $container, itemViewConstructor);

    this.groupViewConstructor = groupViewConstructor;
}

ListEditorBaseGroupedRenderStrategy.prototype = Object.create(ContainerRenderStrategy.prototype);
ListEditorBaseGroupedRenderStrategy.prototype.constructor = ListEditorBaseGroupedRenderStrategy;

ListEditorBaseGroupedRenderStrategy.prototype.render = function () {
    //вычислить группированные значения
    var groupValueSelector = this.model.get('groupValueSelector');

    var groupValues = [];

    this.items.toArray()
        .map(function (item, index) {
            return {
                index: index,
                item: item,
                value: groupValueSelector(undefined, {value: item})
            };
        })
        .forEach(function (item, index, items) {
            
        });

    console.log(groupValues);
    //this.renderItemsAt(this.items.toArray());
};

ListEditorBaseGroupedRenderStrategy.prototype.renderItem = function (item) {
    var itemViewConstructor = this.itemViewConstructor;
    var itemView = new itemViewConstructor({
        model: this.model,
        item: item
    });

    return itemView.render().$el;
};

ListEditorBaseGroupedRenderStrategy.prototype.onAddItem = function (context, argument) {
};

ListEditorBaseGroupedRenderStrategy.prototype.onRemoveItem = function (context, argument) {
};

ListEditorBaseGroupedRenderStrategy.prototype.onReplaceItem = function () {
};

ListEditorBaseGroupedRenderStrategy.prototype.onMoveItem = function (context, argument) {
};

ListEditorBaseGroupedRenderStrategy.prototype.onResetItem = function () {
};

ListEditorBaseGroupedRenderStrategy.prototype.onChangeItem = function () {
    this.render();//На любое изменение группированной коллекции перерисовываем все
};

