var ListEditorBaseModel = ContainerModel.extend({

    defaults: _.extend({}, ContainerModel.prototype.defaults, {
        multiSelect: false
    }),

    getValueFromItem: function (item) {
        var
            valueSelector = this.get('valueSelector'),
            value;

        value = valueSelector(undefined, {value: item});
        return value;
    },

    initialize: function () {
        ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        editorBaseModelMixin.call(this);

        this.set(this.defaults, {silent: true});
        this.on('change:selectedItem', function (model, value) {
            this.set('value', this.getValueFromItem(value));
            //var message = {
            //    value: val
            //};
            //console.log('onValueChanging', message.value);
            //this.trigger('onValueChanging', message);
        }, this);

        this.on('toggleValue', this.onToggleValue, this);
    },

    onSelectedItemChanged: function (handler) {
        this.on('onValueChanging', handler);
    },

    onToggleValue: function (val) {
        var
            value = this.get('value'),
            multiSelect = this.get('multiSelect'),
            newValue;

        if (this.hasValue(val)) {
            if (!multiSelect || !Array.isArray(value)) {
                return;
            }

            var comparator = this.get('valueComparator');
            newValue = value.filter(function (i) {
                return !comparator.isEqual(i, val);
            }, this);
        } else {
            if (multiSelect) {
                if (Array.isArray(value)) {
                    newValue = value.slice();
                } else {
                    newValue = [];
                }
                newValue.push(val);
            } else {
                newValue = val;
            }
        }
        this.set('value', newValue);
    },

    hasValue: function (val) {
        var multiSelect = this.get('multiSelect');
        var value = this.get('value');
        var comparator = this.get('valueComparator');
        var result = false;


        if (multiSelect) {
            if (Array.isArray(value)) {
                result = value.some(function (i) {
                    return comparator.isEqual(i, val);
                }, this);
            }
        } else {
            result = comparator.isEqual(value, val);
        }
        return result;
    }
});
