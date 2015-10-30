/**
 *
 * @param {ComboBoxDropdownView} dropdownView
 * @augments ComboBoxBaseViewStrategy
 * @constructor
 */
function ComboBoxPlainViewStrategy(dropdownView) {
    ComboBoxBaseViewStrategy.call(this, dropdownView);
}

ComboBoxPlainViewStrategy.prototype = Object.create(ComboBoxBaseViewStrategy.prototype);
ComboBoxPlainViewStrategy.prototype.constructor = ComboBoxPlainViewStrategy;

ComboBoxPlainViewStrategy.prototype.renderItems = function () {
    var
        itemTemplate = this.getModelAttribute('itemTemplate'),
        $items = [],
        items = this.getModelAttribute('items'),
        itemsAsArray;

    if (items) {
        itemsAsArray = items.toArray()
    }


    if (Array.isArray(itemsAsArray)) {
        $items = itemsAsArray.map(function (item, index) {
            var $item = itemTemplate(undefined, {value: item, index: index}).render();
            var el = $item[0];

            this.addOnClickEventListener($item[0], item);
            return $item;
        }, this);
    }
    this.dropdownView.setItemsContent($items);
};

ComboBoxPlainViewStrategy.prototype.template = InfinniUI.Template["new/controls/comboBox/dropdown/template/plain/template.tpl.html"];

ComboBoxPlainViewStrategy.prototype.getTemplate = function () {
    return this.template;
};
