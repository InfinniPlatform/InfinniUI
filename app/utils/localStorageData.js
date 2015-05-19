var LocalStorageData = function () {
    this.namePrefix = 'InfinniUI.';
};

LocalStorageData.prototype.getKeyName = function (name) {
    return [this.namePrefix, name].join('');
};

LocalStorageData.prototype.getData = function (name, defaultValue) {
    var value = window.localStorage.getItem(this.getKeyName(name));

    if (typeof value === 'undefined') {
        value = defaultValue;
    }

    return value;
};

LocalStorageData.prototype.setData = function (name, value) {
    window.localStorage.setItem(this.getKeyName(name), value);
};

LocalStorageData.prototype.clear = function () {
    window.localStorage.clear();
};