var ListEditorBaseModel = ContainerModel.extend({

    defaults: {
        multiSelect: false
    },

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

        //var itemsCollection = this.get('items');
        //itemsCollection.onChange(function () {
        //    var valueSelector = this.get('valueSelector');
        //    var values = itemsCollection.toArray()
        //        .map(function(item) {
        //            return valueSelector(undefined, {value: item});
        //        });
        //
        //    this.set('values', values);
        //}.bind(this));
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

    //onToggleSelectedItem: function (item) {
    //    var
    //        selectedItem = this.get('selectedItem'),
    //        multiSelect = this.get('multiSelect');
    //
    //    if (multiSelect === false) {
    //        selectedItem = item;
    //    } else {
    //        selectedItem = Array.isArray(selectedItem) ? selectedItem.slice() : [];
    //        var index = selectedItem.indexOf(item);
    //        if (index === -1) {
    //            selectedItem.push(item);
    //        } else {
    //            selectedItem.splice(index, 1);
    //        }
    //    }
    //
    //    this.set('selectedItem', selectedItem);
    //},

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
