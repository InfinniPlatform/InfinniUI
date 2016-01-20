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
 * Обратная совместимость (если строка то конвертирует в "флаговое соответствие")
 */
Criteria.prototype.decodeCriteriaType = function (value) {
    var criteriaType = value;

    if (typeof value === 'string') {
        criteriaType = parseInt(value, 10);
        if (isNaN(criteriaType)) {
            criteriaType = this.criteriaType[value]
        }
    }

    return criteriaType;
};

Criteria.prototype.normalizeCriteria = function (criteria) {

};

Criteria.prototype.criteriaType = {
    IsEquals: 1,
    IsNotEquals: 2,
    IsMoreThan: 4,
    IsLessThan: 8,
    IsMoreThanOrEquals: 16,
    IsLessThanOrEquals: 32,
    IsContains: 64,
    IsNotContains: 128,
    IsEmpty: 256,
    IsNotEmpty: 512,
    IsStartsWith: 1024,
    IsNotStartsWith: 2048,
    IsEndsWith: 4096,
    IsNotEndsWith: 8192,
    IsIn: 16384,
    Script: 32768,
    FullTextSearch: 65536,
    IsIdIn: 131072
};


/**
 * Функция конвертирует CriteriaType в "флаговое соответствие"
 * @param val
 * @returns {number}
 */

function toEnum(val) {

    var criteria = new Criteria();

    return criteria.decodeCriteriaType(val);
}

var criteriaType = {
    IsEquals: 1,
    IsNotEquals: 2,
    IsMoreThan: 4,
    IsLessThan: 8,
    IsMoreThanOrEquals: 16,
    IsLessThanOrEquals: 32,
    IsContains: 64,
    IsNotContains: 128,
    IsEmpty: 256,
    IsNotEmpty: 512,
    IsStartsWith: 1024,
    IsNotStartsWith: 2048,
    IsEndsWith: 4096,
    IsNotEndsWith: 8192,
    IsIn: 16384,
    Script: 32768,
    FullTextSearch: 65536,
    IsIdIn: 131072
};

