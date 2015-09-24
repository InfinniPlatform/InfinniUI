/**
 *
 * @param {Array} items
 * @param {string} [idProperty]
 * @param {function} [comparator]
 * @constructor
 */
function Collection (items, idProperty, comparator) {
    if (!Array.isArray(items)) {
        items = [];
    }

    /**
     * @type {Array.<Object>}
     * @protected
     */
    this._items = items.map(function (value, index) {
        return this.createCollectionItem(value, index);
    }, this);

    /**
     * @type {string|null}
     * @protected
     */
    this._idProperty = typeof idProperty === 'undefined' ? null : idProperty;

    /**
     * @type {function}
     * @protected
     */
    this._comparator = comparator || defaultComparator;

    function defaultComparator (a, b) {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
        return 0;
    }
}

Object.defineProperties(Collection.prototype, /** @lends Collection.prototype */{
    /**
     * @type {string|null}
     */
    idProperty: {
        get: function () {
            return this._idProperty;
        },
        enumerable: false
    },
    /**
     * @type {function}
     */
    comparator: {
        get: function () {
            return this._comparator;
        },
        enumerable: false
    },
    /**
     * @type {number}
     */
    length: {
        get: function () {
            return this._items.length;
        },
        enumerable: false
    },
    /**
     * @type {boolean}
     */
    hasIdProperty: {
        get: function () {
            return typeof this._idProperty !== 'undefined';
        },
        enumerable: false
    }
});

/**
 *
 * @param {number} index
 * @param {string} propertyName
 * @param {*} value
 * @returns {Collection}
 */
Collection.prototype.setProperty = function (index, propertyName, value) {
    var item = this._items[index];

    if (item) {
        item[propertyName] = value;
    }
    return this;
};

/**
 *
 * @param {number} index
 * @param {string} propertyName
 * @returns {*}
 */
Collection.prototype.getProperty = function (index, propertyName) {
    var item = this._items[index];

    if (item) {
        return item[propertyName];
    }
};

/**
 * @description Возвращает количество элементов в коллекции
 * @returns {number} Количество элементов в коллекции
 */
Collection.prototype.size = function () {
    return this.length;
};

/**
 * @description Добавляет элемент в конец коллекции
 * @param {*} value
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.push = function (value) {
    var items = this._items;
    var item = this.createCollectionItem(value, items.length);

    items.push(item);
    return true;
};

Collection.prototype.add = Collection.prototype.push;

/**
 * @description Добавляет элементы в конец коллекции
 * @param {Array} values
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.addAll = function (values) {
    if (!Array.isArray(values)) {
        return false;
    }

    var items = this._items;

    values.forEach(function (value) {
        var item = this.createCollectionItem(value, items.length);
        items.push(item);
    }, this);

    return values.length > 0;
};

/**
 * @description Вставляет элемент в указанную позицию коллекции
 * @param {number} index
 * @param {*} newItem
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.insert = function (index, newItem) {
    var item = this.createCollectionItem(newItem, index);
    this._items.splice(index, 0, item);

    return true;
};

/**
 *
 * @param {number} index
 * @param {Array} newItems
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.insertAll = function (index, newItems) {
    if (!Array.isArray(newItems)) {
        return false;
    }

    var items = this._items;
    newItems.forEach(function(value, i) {
        var start = index + i;
        var item = this.createCollectionItem(value, start);
        items.splice(start, 0, item);
    }, this);

    return newItems.length > 0;
};

/**
 * @description Устанавливает список элементов коллекции
 * @param {Array} newItems
 * @return {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.reset = function (newItems) {
    var changed, items;

    if (!Array.isArray(newItems)) {
        return false;
    }

    changed = this._items.length > 0;
    this._items.length = 0;

    items = newItems.map(function (value, index) {
        changed = true;
        return this.createCollectionItem(value, index);
    }, this);

    Array.prototype.push.apply(this._items, items);
    return changed;
};


/**
 * @description Заменяет элемент коллекции на указанный
 * @param {Array} newItems
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.set = function (newItems) {
    var items = this._items;

    if (!Array.isArray(newItems)) {
        return false;
    }

    var matched, i = 0;
    var itemValue, newValue = null;
    while(i < items.length) {
        itemValue = this.getCollectionItemValue(i);
        matched = newItems.some(function(value, newItem) {
            newValue = newItem;
            return this.isEqual(newItem, value);
        }.bind(this, itemValue));

        if (!matched) {
            //Удаляем элемент, не содержащийся в новом списке
            items.splice(i, 1);
            continue;
        }

        //Обновляем значение совпадающего элемента
        this.updateCollectionItem(items[i], newValue);
        i = i + 1;
    }
};

/**
 * @description Заменяет элемент коллекции на указанный.
 * @param {*} oldItem
 * @param {*} newItem
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.replace = function (oldItem, newItem) {
    var itemValue;
    var changed = true;
    for (var i = 0; i < this._items.length; i = i + 1) {
        itemValue = this.getCollectionItemValue(i);
        if (this.isEqual(oldItem, itemValue)) {
            this.updateCollectionItem(this._items[i], newItem);
            changed = true;
            break;
        }
    }

    return changed;
};

/**
 * @description Удаляет последний элемент из коллекции
 * @returns {*|undefined} Возвращает последний элемент коллекции, который был удален
 */
Collection.prototype.pop = function () {
    if (this._items.length === 0) {
        return;
    }

    var itemValue = this.getCollectionItemValue(this.length - 1);
    this._items.pop();
    return itemValue;
};

/**
 * @description Удаляет указанный элемент из коллекции
 * @param {*} item
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.remove = function (item) {
    var itemValue;
    var changed = true;
    for (var i = 0; i < this._items.length; i = i + 1) {
        itemValue = this.getCollectionItemValue(i);
        if (this.isEqual(item, itemValue)) {
            this._items.splice(i, 1);
            changed = true;
            break;
        }
    }

    return changed;
};

/**
 * @description Удаляет элемент с указанным идентификатором из коллекции
 * @param {number|string} id
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.removeById = function (id) {
    if (!this.hasIdProperty) {
        return false;
    }

    var itemValue;
    var changed = true;
    for (var i = 0; i < this._items.length; i = i + 1) {
        itemValue = this.getCollectionItemValue(i);
        if (this.getValueId(itemValue) === id) {
            this._items.splice(i, 1);
            changed = true;
            break;
        }
    }

    return changed;
};

/**
 * @description Удаляет элемент с указанным индексом из коллекции
 * @param {number} index
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.removeAt = function (index) {
    if (index >= this._items.length) {
        return false;
    }

    this._items.splice(index, 1);
    return true;
};


/**
 * @description Удаляет указанные элементы из коллекции
 * @param {Array} items
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.removeAll = function (items) {
    if (!Array.isArray(items)) {
        return false;
    }

    var collectionItems = this._items;
    var deletedItems = [];

    items.forEach(function (value) {

        deletedItems = collectionItems.filter(function (item) {
            return this.isEqual(value, this.getItemValue(item));
        }, this);

        deletedItems.forEach(function (item) {
            var index = collectionItems.indexOf(item);
            collectionItems.splice(index, 1);
        });
    }, this);

    return deletedItems.length > 0;
};


/**
 * @description Удаляет диапазон элементов из коллекции
 * @param {number} fromIndex
 * @param {number} [count]
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.removeRange = function (fromIndex, count) {
    var items = this._items;
    if (fromIndex >= items.length) {
        return false;
    }

    if (typeof count === 'undefined') {
        count = items.length - fromIndex;
    }

    items.splice(fromIndex, count);
    return count > 1;
};


/**
 * @description Удаляет все элементы из коллекции, удовлетворяющие указанному условию
 * @param {function} predicate
 * @param [thisArg]
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.removeEvery = function (predicate, thisArg) {
    if (typeof predicate !== 'function') {
        return false;
    }

    var items = this._items;
    var deletedItems = items.filter(function (item, index) {
        var itemValue = this.getItemValue(item);
        return predicate.call(thisArg, itemValue, index, this);
    }, this);

    deletedItems.forEach(function (deletedItem) {
        var index = items.indexOf(deletedItem);
        items.splice(index, 1);
    });

    return deletedItems.length > 0;
};


/**
 * @description Удаляет все элементы из коллекции
 * @returns {boolean} Возвращает true, если коллекция была изменена, иначе - false
 */
Collection.prototype.clear = function () {
    var
        items = this._items,
        changed = items.length > 0;

    items.length = 0;

    return changed;
};

/**
 * @description Возвращает элемент коллекции с заданным идентификатором.
 * @param {number|string} id
 * @returns {*|undefined} Элемент коллекции с заданным идентификатором
 */
Collection.prototype.getById = function (id) {
    if (!this.hasIdProperty) {
        return false;
    }

    var items = this._items;
    var itemValue;

    for (var i = 0; i < items.length; i = i + 1) {
        itemValue = this.getCollectionItemValue(i);
        if (this.getValueId(itemValue) === id) {
            break;
        }
    }

    return itemValue;
};

/**
 * @description Возвращает элемент коллекции с заданным индексом
 * @param {number} index
 * @returns {*|undefined}
 */
Collection.prototype.getByIndex = function (index) {
    return this.getCollectionItemValue(index);
};

/**
 * #description Возвращает первый найденный элемент коллекции, удовлетворяющий условию
 * @param {function} predicate
 * @param [thisArg]
 * @returns {*|undefined} Первый найденный элемент коллекции, удовлетворяющий указанному условию.
 */
Collection.prototype.find = function (predicate, thisArg) {
    if (typeof predicate !== 'function') {
        return false;
    }

    var items = this._items;
    var itemIndex;
    var matched = items.some(function (item, index) {
        var itemValue = this.getItemValue(item);
        itemIndex = index;
        return predicate.call(thisArg, itemValue, index, this);
    }, this);

    if (matched) {
        return this.getCollectionItemValue(itemIndex);
    }
};

/**
 * @description Возвращает индекс первого найденного элемента коллекции при поиске с начала
 * @param {*} item
 * @param {number} [fromIndex = 0]
 * @returns {number} Индекс первого найденного элемента коллекции или -1, если элемент не найден
 */
Collection.prototype.indexOf = function (item, fromIndex) {
    var
        items = this._items,
        index = -1;

    for (var i = fromIndex;  i < items.length; i = i + 1) {
        var itemValue = this.getItemValue(items[i]);
        if (this.isEqual(item, itemValue)) {
            index = i;
            break;
        }
    }

    return index;
};


/**
 * @description Возвращает индекс первого найденного элемента коллекции при поиске с конца
 * @param {*} item
 * @param {number} [fromIndex]
 * @returns {number} Индекс первого найденного элемента коллекции или -1, если элемент не найден
 */
Collection.prototype.lastIndexOf = function (item, fromIndex) {
    var
        items = this._items,
        index = -1;

    if (typeof fromIndex === 'undefined') {
        fromIndex = items.length - 1;
    }

    if (items.length === 0 || fromIndex >= items.length) {
        return -1;
    }

    for (var i = fromIndex;  i > 0; i = i - 1) {
        var itemValue = this.getItemValue(items[i]);
        if (this.isEqual(item, itemValue)) {
            index = i;
            break;
        }
    }

    return index;
};

/**
 * @description Возвращает индекс первого найденного элемента коллекции, удовлетворяющего условию
 * @param {function} predicate
 * @param [thisArg]
 * @returns {*} Индекс первого найденного элемента коллекции, удовлетворяющего указанному условию
 */
Collection.prototype.findIndex = function (predicate, thisArg) {
    if (typeof predicate !== 'function') {
        return false;
    }

    var items = this._items;
    var itemIndex = -1;
    var matched = items.some(function (item, index) {
        var itemValue = this.getItemValue(item);
        itemIndex = index;
        return predicate.call(thisArg, itemValue, index, this);
    }, this);

    return matched ? itemIndex : -1;
};

/**
 * @description Проверяет наличие указанного элемента в коллекции
 * @param {*} item
 * @param {number} [fromIndex = 0]
 * @returns {boolean} Возвращает true, если указанный элемент содержится в коллекции, иначе - false
 */
Collection.prototype.contains = function (item, fromIndex) {
    fromIndex = fromIndex || 0;

    var
        found = false,
        items = this._items;

    for (var i = fromIndex; i < items.length; i = i + 1) {
        var itemValue = this.getItemValue(items[i]);
        found = this.isEqual(itemValue, item);
        if (found) {
            break;
        }
    }

    return found;
};


/**
 * @description Проверяет, что каждый элемент коллекции удовлетворяет указанному условию
 * @param {function} predicate
 * @param [thisArg]
 * @returns {boolean} Возвращает true, если каждый элемент удовлетворяют указанному условию, иначе - false
 */
Collection.prototype.every = function (predicate, thisArg) {

    if (typeof predicate !== 'function') {
        return false;
    }

    var items = this._items;

    return items.every(function (item, index) {
        var itemValue = this.getItemValue(item);
        return predicate.call(thisArg, itemValue, index, this);
    }, this);
};


/**
 * @description Проверяет, что некоторый элемент коллекции удовлетворяет указанному условию
 * @param {function} predicate
 * @param [thisArg]
 * @returns {boolean} Возвращает true, если есть элемент, удовлетворяющий указанному условию, иначе - false
 */
Collection.prototype.some = function (predicate, thisArg) {
    if (typeof predicate !== 'function') {
        return false;
    }

    var items = this._items;

    return items.some(function (item, index) {
        var itemValue = this.getItemValue(item);
        return predicate.call(thisArg, itemValue, index, this);
    }, this);
};

/**
 * @description Перечисляет все элементы коллекции
 * @param {function} callback
 * @param [thisArg]
 */
Collection.prototype.forEach = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        return;
    }

    var items = this._items;

    items.forEach(function (item, index) {
        var itemValue = this.getItemValue(item);

        callback.call(thisArg, itemValue, index, this);
    }, this);
};

/**
 * @description Возвращает элементы коллекции, удовлетворяющие указанному условию
 * @param {function} predicate
 * @param [thisArg]
 * @returns {Array}
 */
Collection.prototype.filter = function (predicate, thisArg) {
    if (typeof predicate !== 'function') {
        return [];
    }

    var items = this._items;

    return items
        .filter(function (item, index) {
            var itemValue = this.getItemValue(item);
            return predicate.call(thisArg, itemValue, index, this);
        }, this)
        .map(function (item) {
            return this.getItemValue(item);
        }, this);
};




/**
 * @protected
 * @param value
 * @returns {*}
 */
Collection.prototype.getValueId = function (value) {
    if (this.hasIdProperty && typeof  value !== 'undefined' && value !== null) {
        return value[this._idProperty]
    }
};

/**
 * @protected
 * @param value1
 * @param value2
 * @returns {boolean}
 */
Collection.prototype.isEqual = function (value1, value2) {
    var idProperty = this.idProperty;

    if (this.hasIdProperty) {
        if(isNotEmpty(value1, value2)) {
            return value1[idProperty] === value2[idProperty];
        } else {
            return false;
        }
    } else {
        return value1 === value2;
    }

    function isNotEmpty() {
        var values = Array.prototype.slice.call(arguments);
        return values.every(function (value) {
            return typeof value !== 'undefined' && value !== null;
        });
    }
};

/**
 * @protected
 * @param {*} value
 * @param {number} [index]
 * @returns {CollectionItem}
 */
Collection.prototype.createCollectionItem = function (value, index) {
    var item = Object.create(null);

    item.__value = value;
    item.__index = index;

    return item;
};

/**
 * @protected
 * @param item
 * @param value
 * @returns {*}
 */
Collection.prototype.updateCollectionItem = function (item, value) {
    item.__value = value;
    return item;
};

/**
 * @protected
 * @param {number} index
 * @return {*}
 */
Collection.prototype.getCollectionItemValue = function (index) {
    var item = this._items[index];

    return this.getItemValue(item);
};

Collection.prototype.getItemValue = function (item) {
    if (item) {
        return item.__value;
    }
};


/**
 * @typedef {Object} CollectionItem
 * @property {*} __value
 * @property {number} __index
 */