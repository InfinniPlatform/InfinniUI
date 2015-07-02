function CollectionStrategyIndex() {
    this._resetData();
}

Object.defineProperties(CollectionStrategyIndex.prototype, {
    length: {
        get: function () {
            return this._items.length;
        },
        enumerable: false
    }
});

CollectionStrategyIndex.prototype.toString = function () {
    return this._items.join(',');
};

CollectionStrategyIndex.prototype._resetData = function () {
    this._items = [];
};

CollectionStrategyIndex.prototype.push = function (newItem) {
    this._items.push(newItem);
    return true;
};

CollectionStrategyIndex.prototype.add = function (newItem) {
    return this.push(newItem);
};

CollectionStrategyIndex.prototype.addAll = function (newItems) {
    if (!Array.isArray(newItems)) {
        return false;
    }

    Array.prototype.push.apply(this._items, newItems);
    return true;
};

CollectionStrategyIndex.prototype.insert = function (index, newItem) {
    var position = (index < 0) ? 0 : Math.min(index, this._items.length);

    if (position < this._items.length) {
        this._items.splice(index, 0, newItem);
    } else {
        this._items.push(newItem);
    }
    return true;
};

CollectionStrategyIndex.prototype.insertAll = function (index, newItems) {
    if (!Array.isArray(newItems) || newItems.length === 0) {
        return false;
    }
    var position = (index < 0) ? 0 : Math.min(index, this._items.length);

    if (position < this._items.length) {
        Array.prototype.splice.apply(this._items, [index, 0].concat(newItems));
    } else {
        Array.prototype.push.apply(this._items, newItems);
    }
    return true;
};

CollectionStrategyIndex.prototype.reset = function (newItems) {
    if (!Array.isArray(newItems)) {
        return false;
    }

    var changed = this._items.length !== newItems.length;

    if (!changed) {
        for (var i = 0; i < newItems.length; i = i + 1) {
            if (this._items.indexOf(newItems[i]) === -1) {
                changed = true;
                break;
            }
        }
    }

    if (changed) {
        this._items = newItems.slice();
    }

    return changed;
};
