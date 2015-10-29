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

//ComboBoxPlainViewStrategy.prototype.prepareItemsForRendering = function () {
//    var items = model.getModelAttribute('items'),
//        result = {
//            items: items.toArray()
//        };
//
//    return result;
//};

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
            return itemTemplate(undefined, {value: item, index: index}).render();
        });
    }
    this.dropdownView.setItemsContent($items);
};

ComboBoxPlainViewStrategy.prototype.template = InfinniUI.Template["new/controls/comboBox/dropdown/template/plain/template.tpl.html"];

ComboBoxPlainViewStrategy.prototype.getTemplate = function () {
    return this.template;
};
