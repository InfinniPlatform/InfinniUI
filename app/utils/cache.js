var Cache = function () {
    this.cleanup();
};

/**
 * @description Возвращает закешированное значение по ключу или false, если значения нет в кеше
 * @param {String|Object} key
 * @returns {*}
 */
Cache.prototype.get = function (key) {
    var hash = this.getKeyHash(key);
    var data = this.data[hash];

    if (typeof data === 'undefined') {
        return false;
    }

    if (this.isValid(hash)) {
        data.count = data.count + 1;
        return data.value;
    }

    return false;
};

/**
 * @description Сохраняет значение для указанного ключа
 * @param {*} key
 * @param {*} value
 * @returns {*}
 */
Cache.prototype.set = function (key, value) {
    var hash = this.getKeyHash(key);
    this.data[hash] = {
        value: value,
        date: new Date(),
        count: 0
    };

    return value;
};

/**
 * @description Сброс кеша
 * @returns {Cache}
 */
Cache.prototype.flush = function () {
    this.cleanup();
    return this
};

/**
 * @description Установка времени жизни кеша в лиллисекундах. 0 - Неограниченное время.
 * @param {numeric} lifetime
 * @returns {Cache}
 */
Cache.prototype.setLifetime = function (lifetime) {
    var value = parseInt(lifetime, 0);
    if (!isNaN(value)) {
        this.lifetime = value;
    }

    return this;
};

Cache.prototype.validFor = function (func) {
    if (typeof func !== 'function') {
        return;
    }
    if (this.list.indexOf(func) === -1) {
        this.list.push(func);
    }
};

Cache.prototype.cleanup = function () {
    this.count = 0;
    this.data = {};
    this.lifetime = 0;
    this.list = [];
};

Cache.prototype.invalidate = function (hash) {
    delete this.data[hash];
};

Cache.prototype.isValid = function (hash) {
    var data = this.data[hash];
    if (this.lifetime < 0) {
        this.invalidate(hash);
    } else if (this.lifetime > 0){
        if (Date.now() - data.date.getTime() > this.lifetime) {
            this.invalidate(hash);
            return false;
        }
    }

    for (var i = 0, ln = this.list.length; i < ln; i = i + 1) {
        if (this.list[i].call() === false) {
            this.invalidate(hash);
            return false;
        }
    }

    return true;
};

Cache.prototype.getKeyHash = function (key) {
    return JSON.stringify(key);
};
