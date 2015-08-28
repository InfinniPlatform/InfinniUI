var ListBoxModel = ControlModel.extend({
    defaults: _.extend({}, ControlModel.prototype.defaults, {

    }),

    initialize: function () {
        this.on('change:value', this.updateValueItemsIndex, this);
        this.on('change:items', this.updateValueItemsIndex, this);
    },

    set: function (key, val, options) {
        if (typeof key === 'string' && ['selectedItem', 'value'].indexOf(key) !== -1) {
            var oldValue = this.get(key);
            if (this.isEqualValue(oldValue, val)) {
                return this;
            }
            return ControlModel.prototype.set.call(this, key, val, options);
        }
        return ControlModel.prototype.set.apply(this, Array.prototype.slice.call(arguments));
    },

    toggleValue: function (value) {
        var values = this.get('value');

        if (Array.isArray(values)) {
            if (values.some(this.isEqualValue.bind(this, value))) {
                values = values.filter(this.isNotEqualValue.bind(this, value));
            } else {
                values = values.slice();
                values.push(value);
            }
        } else {
            values = [value];
        }

        this.set('value', values);
    },

    updateValueItemsIndex: function () {
        //@TODO Пересчитать какие элементы д.б. отмечены
        var
            value = this.get('value'),
            items = this.get('items'),
            multiSelect = this.get('multiSelect'),
            valueSelector = this.get('valueSelector'),
            isEqualValue = this.isEqualValue,
            index,
            itemsValue;

        if (Array.isArray(items)) {
            itemsValue = items.map(valueSelector);
            if (multiSelect) {
                if (Array.isArray(value)) {
                    index = value.map(getIndexValue);
                }
            } else {
                index = getIndexValue(value);
            }
        }

        //@TODO Проверить, что реально изменились элементы?
        this.set('valueItemsIndex', index);

        function getIndexValue(value) {
            var valueIndex = null;

            itemsValue.some(function (itemValue, index) {
                if (isEqualValue(itemValue, value)) {
                    valueIndex = index;
                    return true;
                }
                return false;
            });
            return valueIndex;
        }
    },

    isEnabled: function () {
        var
            readOnly = this.get('readOnly'),
            enabled = this.get('enabled');

        return !readOnly && enabled;
    },

    isSelectedIndex: function (index) {
        return this.isEqualValue(this.get('selectedItem'), this.getItemByIndex(index));
    },

    getItemByIndex: function (index) {
        var
            items = this.get('items'),
            item;

        if(Array.isArray(items)) {
            item = items[index];
        }

        return item;
    },

    isEqualValue: function (val1, val2) {
        return JSON.stringify(val1) === JSON.stringify(val2);
    },

    isNotEqualValue: function (val1, val2) {
        return !this.isEqualValue(val1, val2);
    }



});