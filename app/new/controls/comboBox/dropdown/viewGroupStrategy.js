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

ComboBoxGroupViewStrategy.prototype.renderItems = function () {
    var
        itemTemplate = this.getModelAttribute('itemTemplate'),
        groupingFunction = this.getModelAttribute('groupValueSelector'),
        $items,
        items = this.getModelAttribute('items'),
        groups = {},
        itemsAsArray;

    items.forEach(function (item, index) {
        var groupKey = groupingFunction(undefined, {value: item});

        if (!(groupKey in groups)) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(item);
    });

    for (var name in groups) {
        items = groups[name];
        $items = items.map(function (item, index) {
            return itemTemplate(undefined, {value: item, index: index}).render();
        });
    }





};

ComboBoxGroupViewStrategy.prototype.template = InfinniUI.Template["new/controls/comboBox/dropdown/template/group/template.tpl.html"];

ComboBoxGroupViewStrategy.prototype.getTemplate = function () {
    return this.template;
};

