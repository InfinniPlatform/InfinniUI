var ListEditorBaseModel = ContainerModel.extend({

    defaults: {
        multiSelect: false
    },

    initialize: function () {
        ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        editorBaseModelMixin.call(this);

        this.set(this.defaults, {silent: true});
        this.on('change:selectedItem', function (model, value) {
            var valueSelector = model.get('valueSelector');
            var multiSelect = model.get('multiSelect');
            var val;

            if (Array.isArray(value)) {
                val = value.map(function (value) {
                    return valueSelector(undefined, {value: value});
                });
            } else {
                val = valueSelector(undefined, {value: value});
            }

            this.set('value', val);
            //var message = {
            //    value: val
            //};
            //console.log('onValueChanging', message.value);
            //this.trigger('onValueChanging', message);
        }, this);

        this.on('toggleSelectedItem', this.onToggleSelectedItem, this);

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

    onToggleSelectedItem: function (item) {
        var
            selectedItem = this.get('selectedItem'),
            multiSelect = this.get('multiSelect');

        if (multiSelect === false) {
            selectedItem = item;
        } else {
            selectedItem = Array.isArray(selectedItem) ? selectedItem.slice() : [];
            var index = selectedItem.indexOf(item);
            if (index === -1) {
                selectedItem.push(item);
            } else{
                selectedItem.splice(index, 1);
            }
        }

        this.set('selectedItem', selectedItem);
    }

});