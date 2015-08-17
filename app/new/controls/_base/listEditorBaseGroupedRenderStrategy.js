/**
 * @constructor
 * @extends ContainerRenderStrategy
 */
function ListEditorBaseGroupedRenderStrategy(model, $container, itemViewConstructor, groupItemViewConstructor) {
    ContainerRenderStrategy.call(this, model, $container, itemViewConstructor, groupItemViewConstructor);

    this.groupItemViewConstructor = groupItemViewConstructor;
}

ListEditorBaseGroupedRenderStrategy.prototype = Object.create(ContainerRenderStrategy.prototype);
ListEditorBaseGroupedRenderStrategy.prototype.constructor = ListEditorBaseGroupedRenderStrategy;

ListEditorBaseGroupedRenderStrategy.prototype.render = function () {
    //вычислить группированные значения
    var groupValueSelector = this.model.get('groupValueSelector');
    var groupItemComparator = this.model.get('groupItemComparator');

    var groupValues = [];

    var data = this.items.toArray()
        .map(function (item, index) {
            return {
                index: index,
                item: item,
                value: groupValueSelector(undefined, {value: item})
            };
        });

    while(data.length) {
        var dataItem = data[0];
        groupValues.push({
            value: dataItem.value,
            items: data
                .filter(function(item) {
                    return groupItemComparator(dataItem.value, item.value) === 0;
                })
                .map(function (item) {
                    data.splice(data.indexOf(item), 1);
                    return {
                        index: item.index,
                        item: item.item
                    };
                })
        });
    }

    groupValues.forEach(function (groupItem) {
        var $group = this.renderGroupItem(groupItem.value);

        var $items = groupItem.items.map(function (item) {
            return this.renderItem(item.item)
        }, this);

        $group.append($items);
        this.$container.append($group);
    }, this);

    console.log(groupValues);
    //this.renderItemsAt(this.items.toArray());
};

ListEditorBaseGroupedRenderStrategy.prototype.renderGroupItem = function (item) {
    var viewConstructor = this.groupItemViewConstructor;
    var itemView = new viewConstructor({
        model: this.model,
        item: item
    });

    return itemView.render().$el;
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

