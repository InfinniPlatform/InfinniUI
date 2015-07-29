function CollectionStrategy (comparator) {
    this._events = new CollectionQueueEvent();
    this._comparator = comparator;
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

CollectionStrategy.prototype.clear = function (callback) {
    var 
        oldItems = this._items.slice(),
        changed = oldItems.length > 0;
        
    this._resetData();

    if (changed && typeof callback === 'function') {
        this._events.on(Collection.EVENTS.onRemove, oldItems, 0);
        callback(this._events.extract());        
    }

    return changed;
};

CollectionStrategy.prototype.getByIndex = function (index) {
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

CollectionStrategy.prototype.removeEvery = function (predicate, collection, thisArg, callback) {
    var 
        changed = false,
        oldItems = [];

    this.filter(predicate, collection, thisArg)
        .forEach(function (item) {
            oldItems.push(item);
            changed = this.remove(item) || changed;
        }, this);

    if (changed && typeof callback === 'function') {
        this._events.on(Collection.EVENTS.onRemove, oldItems);
        callback(this._events.extract());        
    }
    return changed;
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

CollectionStrategy.prototype.set = function (newItems) {
    var newItem, _newItems = newItems.slice();


    this.diff(newItems)
        //Удалить
        .forEach(function (item) {
            this.remove(item);
        }, this);

    while (_newItems.length > 0) {
        newItem = _newItems.pop();
        var index = this.indexOf(newItem);
        if (index === -1) {
            //Добавить
            this.add(newItem);
        } else {
            //Заменить
            this.replace(this.getByIndex(index), newItem);
        }
    }

};

CollectionStrategy.prototype.removeAll = function (items, callback) {
    var changed = false;
    items.forEach(function (item) {
        if (this.remove(item)) {
            changed = true;
        }
    }, this);

    if (changed && typeof callback === 'function') {
        this._events.on(Collection.EVENTS.onRemove, items);
        callback(this._events.extract());        
    }

    return changed;
};

/**
 * @protected
 */
CollectionStrategy.prototype.checkIndex = function (index) {
    return index >= 0 && index < this._items.length;
};

/**
 * @protected
 */
CollectionStrategy.prototype.isEqual = function (a, b) {
    return this._getValue(a) === this._getValue(b);
};

/**
 * @protected
 * @description Возвращает список элементов которые есть в коллекции но нет в указанном списке
 * @param otherItems
 * @returns {Array}
 */
CollectionStrategy.prototype.diff = function (otherItems) {
    var
        found,
        currentItems = this._items,
        items = [];

    for (var i = 0; i < currentItems.length; i = i + 1) {
        found = true;

        for (var j = 0; j < otherItems.length; j = j + 1) {
            if (this.isEqual(currentItems[i], otherItems[j])) {
                found = false;
                break;
            }
        }

        if (found) {
            items.push(currentItems[i]);
        }
    }

    return items;
};

/**
 * @param item
 * @returns {*}
 * @protected
 */
CollectionStrategy.prototype._getValue = function (item) {
    return item;
};

CollectionStrategy.prototype.isNotEqual = function (a, b) {
    return !this.isEqual(a, b);
};

CollectionStrategy.prototype.buildOnAdd = function (items, startingIndex) {
    var params = {
        action: 'add',
        newItems: items,
        newStartingIndex: startingIndex
    };

    return params;
};

CollectionStrategy.prototype.buildOnRemove = function (items, startingIndex) {
    var params = {
        action: 'remove',
        oldItems: items,
        oldStartingIndex: typeof startingIndex === 'undefined' ? -1 : startingIndex
    };

    return params;
};





