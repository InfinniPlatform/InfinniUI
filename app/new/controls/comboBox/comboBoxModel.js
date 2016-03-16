var ComboBoxModel = ListEditorBaseModel.extend({

    defaults: _.defaults({
        showClear: true,
        autocomplete: false,
        valueTemplate: function(context, args){
            return {
                render: function(){
                    return args.value;
                }
            };
        }
    }, ListEditorBaseModel.prototype.defaults),

    initialize: function () {
        ListEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

        this.on('change:value', this.syncSelectedItem);
    },

    syncSelectedItem: function (model, value) {
        //var value = this.getValue();
        var selectedItem = this.itemByValue(value);
        this.setSelectedItem(selectedItem);
    },

    getSelectedItem: function () {
        var selectedItem = this.get('selectedItem');

        return selectedItem;
    },

    setSelectedItem: function (item) {
        this.set('selectedItem', item);
    },

    selectNextItem: function () {
        var items = this.get('items');
        var selectedItem = this.getSelectedItem();

        if (items.length > 0) {
            var itemIndex = 0;
            if (selectedItem) {
                itemIndex = items.indexOf(selectedItem);
                if (itemIndex === -1) {
                    itemIndex = 0;
                } else {
                    itemIndex = Math.min(items.length - 1, itemIndex + 1);
                }
            }
            selectedItem = items.getByIndex(itemIndex);
        } else {
            selectedItem = null;
        }
        this.setSelectedItem(selectedItem);
    },

    selectPrevItem: function () {
        var items = this.get('items');
        var selectedItem = this.getSelectedItem();

        if (items.length > 0) {
            var itemIndex = 0;
            if (selectedItem) {
                itemIndex = items.indexOf(selectedItem);
                if (itemIndex === -1) {
                    itemIndex = 0;
                } else {
                    itemIndex = Math.max(0, itemIndex - 1);
                }
            }
            selectedItem = items.getByIndex(itemIndex);
        }
        this.setSelectedItem(selectedItem);
    },

    selectFirstItem: function () {
        var items = this.get('items');
        var selectedItem = null;

        if (items.length > 0) {
            selectedItem = items.getByIndex(0);
        }
        this.setSelectedItem(selectedItem);
    },

    selectLastItem: function () {
        var items = this.get('items');
        var selectedItem = null;

        if (items.length > 0) {
            selectedItem = items.getByIndex(items.length - 1);
        }
        this.setSelectedItem(selectedItem);
    },

    toggleItem: function (item, toggle) {
        var value = this.valueByItem(item);
        this.toggleValue(value, toggle);
        this.trigger('toggle');
    }
});