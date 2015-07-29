function CollectionStrategyIndex(comparator) {
    CollectionStrategy.call(this, comparator);
    this._resetData();
}

CollectionStrategyIndex.prototype = Object.create(CollectionStrategy.prototype);
CollectionStrategyIndex.prototype.constructor = CollectionStrategyIndex;

CollectionStrategyIndex.prototype.clear = function () {
    var changed = this._items.length > 0;
    this._resetData();
    return changed;
};

CollectionStrategyIndex.prototype._add = function (newItem) {
    this._items.push(newItem);
};


CollectionStrategyIndex.prototype.push = function (newItem, callback) {
    this._add(newItem);
    this._events.on(Collection.EVENTS.onAdd, [newItem]);
    callback(this._events.extract());
    return true;
};

CollectionStrategyIndex.prototype.add = function (newItem, callback) {
    return this.push(newItem, callback);
};

CollectionStrategyIndex.prototype.addAll = function (newItems, callback) {
    if (!Array.isArray(newItems)) {
        return false;
    }

    Array.prototype.push.apply(this._items, newItems);
    this._events.on(Collection.EVENTS.onAdd, newItems);
    callback(this._events.extract());
    return true;
};

CollectionStrategyIndex.prototype.insert = function (index, newItem, callback) {
    var
        position = (index < 0) ? 0 : Math.min(index, this._items.length);

    if (position < this._items.length) {
        this._items.splice(index, 0, newItem);
    } else {
        this._items.push(newItem);
    }
    if (typeof callback === 'function') {
        this._events.on(Collection.EVENTS.onAdd, [newItem]);
        callback(this._events.extract());
    }

    return true;
};

CollectionStrategyIndex.prototype.insertAll = function (index, newItems, callback) {
    if (!Array.isArray(newItems) || newItems.length === 0) {
        return false;
    }
    var position = (index < 0) ? 0 : Math.min(index, this._items.length);

    if (position < this._items.length) {
        Array.prototype.splice.apply(this._items, [index, 0].concat(newItems));
    } else {
        Array.prototype.push.apply(this._items, newItems);
    }
    if (typeof callback === 'function') {
        this._events.on(Collection.EVENTS.onAdd, newItems);
        callback(this._events.extract());
    }

    return true;
};

CollectionStrategyIndex.prototype.reset = function (newItems, callback) {
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

        if (typeof callback === 'function') {
            this._events.on(Collection.EVENTS.onReset);
            callback(this._events.extract());
        }
    }

    return changed;
};

CollectionStrategyIndex.prototype.replace = function (oldItem, newItem) {
    var index = this._items.indexOf(oldItem);

    if (index === -1) {
        return false;
    }

    this._items.splice(index, 1, newItem);

    if (typeof callback === 'function') {
        this._events.on(Collection.EVENTS.onReplace, oldItem, newItem);
        callback(this._events.extract());
    }

    return true;
};


CollectionStrategyIndex.prototype.pop = function (callback) {
    var item;

    if (this._items.length > 0) {
        item = this._items.pop();

        if (typeof callback === 'function') {
            this._events.on(Collection.EVENTS.onRemove, [item], this._items.length);
            callback(this._events.extract());
        }

    }
    return item;
};

CollectionStrategyIndex.prototype.remove = function (item) {
    var index,
        changed = false;
    while (true) {
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

CollectionStrategyIndex.prototype.sort = function (comparator) {
    var
        cmp = comparator || this._comparator,
        copy = this._items.slice(),
        changed = false;

    this._items.sort(cmp);
    for (var i = 0; i < this._items.length; i = i + 1) {
        if (this._items[i] !== copy[i]) {
            changed = true;
            break;
        }
    }

    return changed;
};

CollectionStrategyIndex.prototype.removeAt = function (index) {
    var items = this._items.splice(index, 1);
    return items.length > 0;
};

CollectionStrategyIndex.prototype.removeRange = function (fromIndex, count) {
    return this._items
            .splice(fromIndex, count)
            .length > 0;
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
