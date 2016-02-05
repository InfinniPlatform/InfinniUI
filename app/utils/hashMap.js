/**
 * @description Простая реализация хеша у которого в качестве ключей м.б. объект
 * @constructor
 */
function HashMap() {
    this._keys = [];
    this._values = [];
}

Object.defineProperties(HashMap.prototype, /** @lends HashMap.prototype **/{
    length: {
        get: function () {
            return this._keys.length;
        }
    },
    keys: {
        get: function () {
            return this._keys;
        }
    },

    values: {
        get: function () {
            return this._values;
        }
    }
});

HashMap.prototype.add = function (key, value) {
    var i = this._getIndexOfKey(key);

    if (i === -1) {
        this._keys.push(key);
        this._values.push(value);
    } else {
        this._values[i] = value;
    }
};

HashMap.prototype.getKeyByValue = function (value) {
    var key,
        i = this._getIndexOfValue(value);

    if (i !== -1) {
        key = this._keys[i];
    }
    return key;
};

/**
 *
 * @param {Function} predicate
 * @param thisArg
 * @returns {numeric}
 */
HashMap.prototype.findIndex = function (predicate, thisArg) {
    var key, value, index = -1;
    for (var i = 0; i < this._keys.length; i = i + 1) {
        key = this._keys[i];
        value = this._values[i];
        if (predicate.call(thisArg, key, value)) {
            index =  i;
            break;
        }
    }

    return index;
};

HashMap.prototype.get = function (key) {
    var value,
        i = this._getIndexOfKey(key);

    if (i !== -1) {
        value = this._values[i];
    }

    return value;
};

HashMap.prototype.forEach = function (callback, thisArg) {
    this._keys.forEach(function (key, index) {
        callback.call(thisArg, this._values[index], key, index);
    }, this);
};

HashMap.prototype.clear = function (callback) {
    if (typeof callback === 'function') {
        this.forEach(callback);
    }
    this._keys.length = 0;
    this._values.length = 0;
};

/**
 * @param key
 * @returns {number}
 * @private
 */
HashMap.prototype._getIndexOfKey = function (key) {
    return this._keys.indexOf(key);
};

/**
 * @param {*} value
 * @returns {number}
 * @private
 */
HashMap.prototype._getIndexOfValue = function (value) {
    return this._values.indexOf(value);
};