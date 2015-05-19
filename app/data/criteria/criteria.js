var Criteria = function (items) {
    this.onValueChangedHandlers = [];
    this.items = items || [];
};

Criteria.prototype.onValueChanged = function (handler) {
    if (typeof handler === 'function' && this.onValueChangedHandlers.indexOf(handler) === -1) {
        this.onValueChangedHandlers.push(handler);
    }
};

Criteria.prototype.valueChanged = function () {
    _.each(this.onValueChangedHandlers, function (handler) {
        handler();
    });
};



Criteria.prototype.getAsArray = function () {
    var list = [];
    _.each(this.items, function (item) {
        var criteria = {};
        for (var key in item) {
            if (!item.hasOwnProperty(key)) continue;
            if (key === 'Value' && typeof item.Value === 'function') {
                criteria[key] = item.Value();
            } else {
                criteria[key] = item[key];
            }
        }
        list.push(criteria);
    });

    return list;
};

Criteria.prototype.setItems = function (items) {
    if (typeof items !== 'undefined' && items !== null) {
        this.items = items;
    } else {
        this.items = [];
    }
};

/**
 * Функция конвертирует CriteriaType в "флаговое соответствие"
 * @param val
 * @returns {number}
 */

function toEnum(val) {
    switch (val) {
        case 'IsEquals':
            return 1;
            break;
        case 'IsNotEquals':
            return 2;
            break;
        case 'IsMoreThan':
            return 4;
            break;
        case 'IsLessThan':
            return 8;
            break;
        case 'IsMoreThanOrEquals':
            return 16;
            break;
        case 'IsLessThanOrEquals':
            return 32;
            break;
        case 'IsContains':
            return 64;
            break;
        case 'IsNotContains':
            return 128;
            break;
        case 'IsEmpty':
            return 256;
            break;
        case 'IsNotEmpty':
            return 512;
            break;
        case 'IsStartsWith':
            return 1024;
            break;
        case 'IsNotStartsWith':
            return 2048;
            break;
        case 'IsEndsWith':
            return 4096;
            break;
        case 'IsNotEndsWith':
            return 8192;
            break;
        case 'IsIn':
            return 16384;
            break;
    }
}

