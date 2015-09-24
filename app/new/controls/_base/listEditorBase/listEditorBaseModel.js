var ListEditorBaseModel = ContainerModel.extend( _.extend({

    defaults: _.defaults({
        multiSelect: false
    }, ContainerModel.prototype.defaults),

    initialize: function () {
        var that = this;
        ContainerModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();

        this.bindSelectedItemsWithValue();

        this.get('items').onChange(function(){
            that.clearItemsStringifyCache();
        });
    },

    onSelectedItemChanged: function (handler) {
        this.on('change:selectedItem', function(source, newSelectedItem){
            handler({value: newSelectedItem});
        });
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

    bindSelectedItemsWithValue: function(){
        this.on('change:selectedItem', function (model, newSelectedItem) {
            var value = this.get('value'),
                newItemValue = this.valueByItem(newSelectedItem);

            if(!this.get('multiSelect') && !this.isStringifyEqualValues(newItemValue, value)){
                this.set('value', newItemValue);
            }
        }, this);

        this.on('change:value', function (model, newValue) {
            var selectedItem = this.get('selectedItem'),
                newSelectedItem = this.itemByValue(newValue);

            if(!this.get('multiSelect') && selectedItem != newSelectedItem){
                this.set('selectedItem', newSelectedItem);
            }
        }, this);
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

    itemIndexByItem: function(item){
        var value = this.valueByItem(item);
        return this.itemIndexByValue(value);
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
    },

    isStringifyEqualValues: function(v1, v2){
        return JSON.stringify(v1) == JSON.stringify(v2);
    }

}, editorBaseModelMixin));
