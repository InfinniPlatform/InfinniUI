function Collection(items, idProperty, comparator) {
    this._eventDispatcher = new EventDispatcher();
    this._idProperty = idProperty;
    this._comparator = comparator;
    this.initStrategy();
    this.reset(items || []);

    this._eventDispatcher.applyTo(this);
}

Collection.EVENTS = {
    onAdd: 'onAdd',
    onChange: 'onChange',
    onReplace: 'onReplace',
    onReset: 'onReset',
    onRemove: 'onRemove'
};

Collection.prototype.initStrategy = function () {
    var idProperty = this._idProperty;
    if (typeof idProperty === 'undefined' || idProperty === null || idProperty === '') {
        this._strategy = new CollectionStrategyIndex(this._comparator);
    } else {
        this._strategy = new CollectionStrategyId(this._comparator, idProperty);
    }

};

Object.defineProperties(Collection.prototype, {
    idProperty: {
        get: function () {
            return this._idProperty;
        },
        enumerable: false
    },
    comparator: {
        get: function () {
            return this._comparator;
        },
        enumerable: false
    },
    length: {
        get: function () {
            return this._strategy.length;
        },
        enumerable: false
    },
    hasIdProperty: {
        get: function () {
            return typeof this._idProperty !== 'undefined';
        },
        enumerable: false
    }
});

Collection.prototype.toString = function () {
    return this._strategy.toString();
};

Collection.prototype.size = function () {
    return this.length;
};

Collection.prototype.push = function (newItem) {
    var changed;

    changed = this._strategy.push(newItem, this.triggerEvents.bind(this));

    return changed;
};

Collection.prototype.add = function (newItem) {
    var changed = this._strategy.add(newItem, this.triggerEvents.bind(this));
    return changed;
};

Collection.prototype.addAll = function (newItems) {
    var changed = this._strategy.addAll(newItems, this.triggerEvents.bind(this));
    return changed;
};

Collection.prototype.insert = function (index, newItem) {
    var changed = this._strategy.insert(index, newItem, this.triggerEvents.bind(this));
    return changed;
};

Collection.prototype.insertAll = function (index, newItems) {
    var changed = this._strategy.insertAll(index, newItems, this.triggerEvents.bind(this));
    return changed;
};

Collection.prototype.reset = function (newItems) {
    var changed = this._strategy.reset(newItems, this.triggerEvents.bind(this));
    return changed;
};

//@TODO set

Collection.prototype.replace = function (oldItem, newItem) {
    var changed = this._strategy.replace(oldItem, newItem);
    return changed;
};

Collection.prototype.pop = function () {
    var item = this._strategy.pop();
    return item;
};

Collection.prototype.remove = function (item) {
    var changed = this._strategy.remove(item);
    return changed;
};


Collection.prototype.removeById = function (id) {
    var changed = this._strategy.removeById(id);
    return changed;
};

Collection.prototype.indexOf = function (item, fromIndex) {
    var index = this._strategy.indexOf(item, fromIndex);
    return index;
};

Collection.prototype.getById = function (id) {
    var item = this._strategy.getById(id);
    return item;
};

Collection.prototype.removeAt = function (index) {
    var changed = this._strategy.removeAt(index);
    return changed;
};

Collection.prototype.removeAll = function (items) {
    var changed = this._strategy.removeAll(items);
    return changed;
};

Collection.prototype.removeRange = function (fromIndex, count) {
    if (typeof count === 'undefined') {
        count = this.length;
    }
    var changed = this._strategy.removeRange(fromIndex, count);
    return changed;
};

Collection.prototype.lastIndexOf = function (item, fromIndex) {
    var maxIndex = this.length - 1,
        index = (typeof fromIndex === 'undefined') ? maxIndex : fromIndex;

    if (index < 0 || index > maxIndex) {
        return -1;
    }
    return this._strategy.lastIndexOf(item, index);
};

Collection.prototype.getByIndex = function (index) {
    return this._strategy.getByIndex(index);
};

Collection.prototype.findIndex = function (predicate, thisArgs) {
    return this._strategy.findIndex(predicate, this, thisArgs);
};

Collection.prototype.find = function (predicate, thisArgs) {
    return this._strategy.find(predicate, this, thisArgs);
};

Collection.prototype.removeEvery = function (predicate, thisArgs) {
    return this._strategy.removeEvery(predicate, this, thisArgs);
};

Collection.prototype.clear = function () {
    return this._strategy.clear();
};

Collection.prototype.contains = function (item, fromIndex) {
    var index = typeof fromIndex === 'undefined' ? 0 : fromIndex;

    return this._strategy.contains(item, index);
};

Collection.prototype.every = function (predicate, thisArgs) {
    return this._strategy.every(predicate, this, thisArgs);
};

Collection.prototype.some = function (predicate, thisArgs) {
    return this._strategy.some(predicate, this, thisArgs);
};

Collection.prototype.forEach = function (predicate, thisArgs) {
    return this._strategy.forEach(predicate, this, thisArgs);
};

Collection.prototype.filter = function (predicate, thisArgs) {
    return this._strategy.filter(predicate, this, thisArgs);
};

Collection.prototype.take = function (fromIndex, count) {
    return this._strategy.take(fromIndex, count);
};

Collection.prototype.toArray = function () {
    return this._strategy.toArray();
};

Collection.prototype.sort = function (comparator) {
    return this._strategy.sort(comparator);
};

Collection.prototype.clone = function () {
    var collection = new Collection(this.toArray(), this.idProperty, this.comparator);
    return collection;
};

Collection.prototype.set = function (newItems) {
    return this._strategy.set(newItems);
};

Collection.prototype.onAdd = function (handler) {
    var context = null;
    this._eventDispatcher.register(Collection.EVENTS.onAdd, handler.bind(undefined, context));
};

Collection.prototype.onChange = function (handler) {
    var context = null;
    this._eventDispatcher.register(Collection.EVENTS.onChange, handler.bind(undefined, context));
};


/**
 * events = {EventName: EventParams, ...}
 * @param events
 */
Collection.prototype.triggerEvents = function (events) {
    if (typeof this.emit === 'undefined') {
        return;
    }
    for (var name in events) {
        this.emit(name, events[name]);
    }

};