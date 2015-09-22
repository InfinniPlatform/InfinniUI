var ListEditorBaseModel = ContainerModel.extend( _.extend({

    defaults: _.defaults({
        multiSelect: false
    }, ContainerModel.prototype.defaults),

    getValueFromItem: function (item) {
        var
            valueSelector = this.get('valueSelector'),
            value;

        value = valueSelector(undefined, {value: item});
        return value;
    },

    initialize: function () {
        var that = this;
        ContainerModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();

        this.on('change:selectedItem', function (model, value) {
            this.set('value', this.getValueFromItem(value));
            //var message = {
            //    value: val
            //};
            //console.log('onValueChanging', message.value);
            //this.trigger('onValueChanging', message);
        }, this);

        this.on('toggleValue', this.onToggleValue, this);

        this.get('items').onChange(function(){
            that.clearItemsStringifyCache();
        });
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
    },

    valueByItem: function(item){
        var valueSelector = this.get('valueSelector');
        if(!valueSelector){
            return item;
        }else{
            return valueSelector(undefined, {value: item});
        }
    },

    itemInfoByValue: function(value){
        if(!this.itemsStringifyCache){
            this.updateItemsStringifyCache();
        }

        var stringifyValue = JSON.stringify(value);
        return this.itemsStringifyCache[stringifyValue];
    },

    itemByValue: function(value){
        var itemInfo = this.itemInfoByValue(value);

        if(!itemInfo){
            return undefined;
        }else{
            return itemInfo.item;
        }
    },

    itemIndexByValue: function(value){
        var itemInfo = this.itemInfoByValue(value);

        if(!itemInfo){
            return -1;
        }else{
            return itemInfo.index;
        }
    },

    updateItemsStringifyCache: function(){
        var items = this.get('items'),
            that = this,
            stringify,
            value;
        this.itemsStringifyCache = {};

        items.forEach(function(item, index){
            value = that.valueByItem(item);
            stringify = JSON.stringify(value);
            that.itemsStringifyCache[stringify] = {
                item: item,
                index: index
            };
        });
    },

    clearItemsStringifyCache: function(){
        this.itemsStringifyCache = undefined;
    }

}, editorBaseModelMixin));
