/**
 * @param parent
 * @constructor
 * @augments Element
 */
function Container(parent) {
    _.superClass(Container, this, parent);
}

_.inherit(Container, Element);

Container.prototype.getItemTemplate = function () {
    return this.control.get('itemTemplate');
};

Container.prototype.setItemTemplate = function (itemTemplate) {
    if (typeof itemTemplate !== 'function') {
        throw new Error('Function expected');
    }
    this.control.set('itemTemplate', itemTemplate);
};

Container.prototype.getItems = function () {
    return this.control.get('items');
};