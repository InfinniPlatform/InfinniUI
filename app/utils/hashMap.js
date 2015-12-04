/**
 * @description Простая реализация хеша у которого в качестве ключей м.б. объект
 * @constructor
 */
function HashMap() {
    this._keys = [];
    this._values = [];
}

Object.defineProperties(HashMap.prototype, {
    length: {
        get: function () {
            return this._keys.length;
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