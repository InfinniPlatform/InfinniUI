function Container(parent) {
    _.superClass(Container, this, parent);
    this._items = new Collection();
    this._itemTemplate = null;
}

_.inherit(Container, Element);

Container.prototype.getItemTemplate = function () {
    return this._itemTemplate;
};

Container.prototype.setItemTemplate = function (itemTemplate) {
    if (typeof itemTemplate !== 'function') {
        throw new Error('Function expected');
    }
    this._itemTemplate = itemTemplate;
};

Container.prototype.getItems = function () {
    return this._items;
};