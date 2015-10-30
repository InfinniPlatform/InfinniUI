/**
 *
 * @param {ComboBoxDropdownView} dropdownView
 * @augments ComboBoxBaseViewStrategy
 * @constructor
 */
function ComboBoxGroupViewStrategy(dropdownView) {
    ComboBoxBaseViewStrategy.call(this, dropdownView);
}

ComboBoxGroupViewStrategy.prototype = Object.create(ComboBoxBaseViewStrategy.prototype);
ComboBoxGroupViewStrategy.prototype.constructor = ComboBoxGroupViewStrategy;

ComboBoxGroupViewStrategy.prototype.template = InfinniUI.Template["new/controls/comboBox/dropdown/template/group/template.tpl.html"];

ComboBoxGroupViewStrategy.prototype.renderItems = function () {
    var
        itemTemplate = this.getModelAttribute('itemTemplate'),
        groupingFunction = this.getModelAttribute('groupValueSelector'),
        groupItemTemplate = this.getModelAttribute('groupItemTemplate'),
        $items,
        $groups = [],
        collection = this.getModelAttribute('items'),
        groups = {},
        itemsAsArray;

    collection.forEach(function (item, index) {
        var groupKey = groupingFunction(undefined, {value: item, index: index});

        if (!(groupKey in groups)) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(item);
    });


    var $groups = [];

    for (var name in groups) {
        var items = groups[name];
        //Шаблонизированный заголовок группы
        var $header = groupItemTemplate(undefined, {
                index: collection.indexOf(items[0]),
                item: items[0]
            }
        );
        //Шаблонизированные элементы группы
        var $items = items.map(function (item) {
            return itemTemplate(undefined, {
                value: item,
                index: collection.indexOf(item)
            }).render();
        });

        var groupView = new ComboBoxGroupView({
            header: $header.render(),
            items: $items
        });

        $groups.push(groupView.render());
    }

    this.dropdownView.setItemsContent($groups);
};

ComboBoxGroupViewStrategy.prototype.getTemplate = function () {
    return this.template;
};

