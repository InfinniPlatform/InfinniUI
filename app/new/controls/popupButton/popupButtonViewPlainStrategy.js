/**
 *
 * @param {PopupButtonView} popupButton
 * @augments PopupButtonViewStrategy
 * @constructor
 */
function PopupButtonViewPlainStrategy (popupButton) {
    PopupButtonViewStrategy.call(this, popupButton);
}

PopupButtonViewPlainStrategy.prototype = Object.create(PopupButtonViewStrategy.prototype);
PopupButtonViewPlainStrategy.prototype.constructor = PopupButtonViewPlainStrategy;

PopupButtonViewPlainStrategy.prototype.template = InfinniUI.Template["new/controls/popupButton/template/plain_item.tpl.html"];

PopupButtonViewPlainStrategy.prototype.render = function () {
    var control = this.popupButton;
    var model = control.model;
    var items = model.get('items');
    var itemTemplate = model.get('itemTemplate');

    control.removeChildElements();

    var $elements = [];

    items.forEach(function (item, index) {
        var template = this.template();
        var $template = $(template);

        var element = itemTemplate(null, {
            index: index,
            item: item
        });
        control.addChildElement(element);
        $template.append(element.render());
        $elements.push($template);
    }, this);

    return $elements;
};

