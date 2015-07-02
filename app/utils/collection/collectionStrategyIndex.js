function CollectionStrategyIndex() {
    CollectionStrategy.apply(this);
    this._resetData();
}

CollectionStrategyIndex.prototype = Object.create(CollectionStrategy.prototype);
CollectionStrategyIndex.prototype.constructor = CollectionStrategyIndex;

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

CollectionStrategyIndex.prototype.replace = function (oldItem, newItem) {
    var index = this._items.indexOf(oldItem);

    if (index === -1) {
        return false;
    }

    this._items.splice(index, 1, newItem);
    return true;
};


CollectionStrategyIndex.prototype.pop = function () {
    return this._items.pop();
};

CollectionStrategyIndex.prototype.remove = function (item) {
    var index,
        changed = false;
    while(true) {
        index = this._items.indexOf(item);

        if (index === -1) {
            break;
        }
        changed = true;
        this._items.splice(index, 1);
    }

    return changed;
};

CollectionStrategyIndex.prototype.indexOf = function (item, fromIndex) {
  return this._items.indexOf(item, fromIndex);
};


CollectionStrategyIndex.prototype.lastIndexOf = function (item, fromIndex) {
    return this._items.lastIndexOf(item, fromIndex);
};





CollectionStrategyIndex.prototype.removeById = function (id) {
    //@TODO Какой смысл этого метода для коллекции значений
};

CollectionStrategyIndex.prototype.getById = function (id) {
    //@TODO Какой смысл этого метода для коллекции значений
};

/**
 *
 * @private
 */
CollectionStrategyIndex.prototype._resetData = function () {
    this._items = [];
};

