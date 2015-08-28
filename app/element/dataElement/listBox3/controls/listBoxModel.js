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
            if (JSON.stringify(oldValue) === JSON.stringify(val)) {
                return this;
            }
            return ControlModel.prototype.set.call(this, key, val, options);
        }
        return ControlModel.prototype.set.apply(this, Array.prototype.slice.call(arguments));
    },

    updateValueItemsIndex: function () {
        //@TODO Пересчитать какие элементы д.б. отмечены
        var
            value = this.get('value'),
            items = this.get('items'),
            multiSelect = this.get('multiSelect'),
            valueSelector = this.get('valueSelector'),
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

        function isEqualValue (val1, val2) {
            return JSON.stringify(val1) === JSON.stringify(val2);
        }
    },

    isEnabled: function () {
        var
            readOnly = this.get('readOnly'),
            enabled = this.get('enabled');

        return !readOnly && enabled;
    },

    getItemByIndex: function (index) {
        var
            items = this.get('items'),
            item;

        if(Array.isArray(items)) {
            item = items[index];
        }

        return item;
    }

});