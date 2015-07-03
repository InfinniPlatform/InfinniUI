function CollectionStrategy () {
    this._items = [];
}

Object.defineProperties(CollectionStrategy.prototype, {
    length: {
        get: function () {
            return this._items.length;
        },
        enumerable: false
    }
});

CollectionStrategy.prototype.toString = function () {
    return this._items.map(function (item) {
        return JSON.stringify(item);
    }).join(',');
};

CollectionStrategy.prototype.getByIndex = function () {
    if (index < 0 || index >= this._items.length) {
        return;
    }

    return this._items[index];
};

CollectionStrategy.prototype.findIndex = function (predicate, collection, thisArg) {
    var index = -1;

    for (var i = 0; i < this._items.length; i = i + 1) {
        if (predicate.call(thisArg, this._items[i], i, collection)) {
            index = i;
            break;
        }
    }
    return index;
};

CollectionStrategy.prototype.find = function (predicate, collection, thisArg) {
    var item;

    for (var i = 0; i < this._items.length; i = i + 1) {
        if (predicate.call(thisArg, this._items[i], i, collection)) {
            item = this._items[i];
            break;
        }
    }
    return item;
};

CollectionStrategy.prototype.contains = function (item, fromIndex) {
    var contains = false;
    for (var i = fromIndex; i < this._items.length; i = i + 1) {
        if (item === this._items[i]) {
            contains = true;
            break;
        }
    }

    return contains;
};

CollectionStrategy.prototype.every = function (predicate, collection, thisArg) {
    var result = true;

    for (var i = 0; i < this._items.length; i = i + 1) {
        if (predicate.call(thisArg, this._items[i], i, collection) !== true) {
            result = false;
            break;
        }
    }

    return result;
};

CollectionStrategy.prototype.some = function (predicate, collection, thisArg) {
    var result = false;

    for (var i = 0; i < this._items.length; i = i + 1) {
        if (predicate.call(thisArg, this._items[i], i, collection) === true) {
            result = true;
            break;
        }
    }

    return result;
};

CollectionStrategy.prototype.forEach = function (callback, collection, thisArg) {
    var items = this._items;

    for (var i = 0; i < items.length; i = i + 1) {
        callback.call(thisArg, items[i], collection);
    }
};

CollectionStrategy.prototype.filter = function (predicate, collection, thisArg) {
    var result = [],
        item;

    for (var i = 0; i < this._items.length; i = i + 1) {
        item = this._items[i];
        if (predicate.call(thisArg, item, i, collection)) {
            result.push(item);
        }
    }
    return result;
};

CollectionStrategy.prototype.take = function (fromIndex, count) {
    var end;

    if (typeof count !== 'undefined') {
        end = fromIndex + count;
    }
    return this._items.slice(fromIndex, end);
};

CollectionStrategy.prototype.toArray = function () {
    return this._items.slice();
};


/**
 * @abstract
 * @protected
 */
CollectionStrategy.prototype.isEqual = function (a, b) {
    return a === b;
};

CollectionStrategy.prototype.isNotEqual = function (a, b) {
    return !this.isEqual(a, b);
};



