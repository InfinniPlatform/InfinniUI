function FilterCriteriaType() {

}

FilterCriteriaType.prototype.getFilterCallback = function (filter) {
    var callback = function (item) {
        return true;
    };

    if (Array.isArray(filter)) {
        var chain = filter.map(this.getCriteriaCallback, this);
        callback = function (item) {
            return chain.every(function (cb) {
                return cb(item);
            });
        }
    }

    return callback;
};

FilterCriteriaType.prototype.getCriteriaCallback = function (criteria) {
    var filter = function () {
        return true;
    };

    if (criteria && criteria.CriteriaType) {
        var method = this.getCriteriaByCode(criteria.CriteriaType);
        if (typeof method === 'function') {
            filter = function (value) {
                return method(value, criteria.Property, criteria.Value);
            }
        }
    }

    return filter;
};

FilterCriteriaType.prototype.CriteriaTypeCode = {
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
    IsNotIn: 32768,
    FullTextSearch: 65536
};

FilterCriteriaType.prototype.decodeCriteria = function (name) {
    return this.CriteriaTypeCode[name];
};

FilterCriteriaType.prototype.getCriteriaByName = function (name) {
    return this.criteria[name];
};

FilterCriteriaType.prototype.getCriteriaByCode = function (code) {
    if (typeof this._criteriaByCode === 'undefined') {
        this._criteriaByCode = {};

        var i;
        for (var name in this.CriteriaTypeCode) {
            i = this.CriteriaTypeCode[name];
            this._criteriaByCode[i] = CriteriaType[name];
        }
    }
    return this._criteriaByCode[code];
};




