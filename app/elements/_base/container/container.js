/**
 * @param parent
 * @constructor
 * @augments Element
 */
function Container(parent, viewMode) {
    _.superClass(Container, this, parent, viewMode);
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

Container.prototype.getGroupValueSelector = function () {
    return this.control.get('groupValueSelector');
};

Container.prototype.setGroupValueSelector = function (value) {
    this.control.set('groupValueSelector', value);
};

Container.prototype.getGroupItemTemplate = function () {
    return this.control.get('groupItemTemplate');
};

Container.prototype.setGroupItemTemplate = function (value) {
    this.control.set('groupItemTemplate', value);
};

Container.prototype.getGroupItemComparator = function () {
    return this.control.get('groupItemComparator');
};

Container.prototype.setGroupItemComparator = function (value) {
    this.control.set('groupItemComparator', value);
};

