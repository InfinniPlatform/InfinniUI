function CriteriaItem () {

}

(function () {

    function getter (name) {
        return function () {
            return this['_' + name];
        }
    }

    function setter(name) {
        return function (value) {
            var _name = '_' + name;
            var oldValue = this[_name];
            if (value !== oldValue) {
                this[_name] = value;
                this._triggerOnChange(name, value, oldValue);
            }
        }
    }

    Object.defineProperties(CriteriaItem.prototype, {
        value: {
            get: getter('value'),
            set: setter('value'),
            enumerable: true
        },
        property: {
            get: getter('property'),
            set: setter('property'),
            enumerable: true
        },
        criteriaType: {
            get: getter('criteriaType'),
            set: setter('criteriaType'),
            enumerable: true
        }
    });

})();



CriteriaItem.prototype.toJSON = function () {
    return {
        Value: this.value,
        Property: this.property,
        CriteriaType: this.criteriaType
    }
};

CriteriaItem.prototype._triggerOnChange = function (property, newValue, oldValue) {
    this.trigger('change:' + property, this, newValue, oldValue);
    this.trigger('change', this, newValue);
};

CriteriaItem.prototype.setProperty = function (name, value) {
    this[name] = value;
};

_.extend(CriteriaItem.prototype, Backbone.Events);
