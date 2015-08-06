function ListBoxBuilder() {
    _.superClass(ListBoxBuilder, this);
}

_.inherit(ListBoxBuilder, ListEditorBaseBuilder);

_.extend(ListBoxBuilder.prototype, {

    createElement: function (params) {
        return new ListBox(params.parent);
    },

    applyMetadata: function (params) {
        ListEditorBaseBuilder.prototype.applyMetadata.call(this, params);
        //this.initItemsBinding(params);
    },

    //initItemsBinding: function (params) {
    //    var metadata = params.metadata.Items;
    //    var itemsCollection = this.getItems();
    //    if(!metadata) {
    //        return;
    //    }
    //
    //    var binding = params.builder.build(params.parent, metadata, params.collectionProperty);
    //
    //    if (typeof binding !== 'undefined' && binding !== null) {
    //        binding.onPropertyValueChanged(function (context, argument) {
    //            var newItems = argument.value;
    //
    //            if (!Array.isArray(newItems)) {
    //                itemsCollection.clear();
    //                return;
    //            }
    //
    //            //Удалить элементы, которых нет в новых данных
    //            itemsCollection
    //                .filter(function (item) {
    //                    return newItems.indexOf(item) === -1;
    //                })
    //                .forEach(function(item) {
    //                    itemsCollection.remove(item);
    //                });
    //
    //            //Добавить новые элементы,которые появились в данных
    //            newItems.filter(function (item) {
    //                    return !itemsCollection.contains(item)
    //                })
    //                .forEach(function(item){
    //                    itemsCollection.add(item);
    //                });
    //
    //        });
    //    }
    //    return binding;
    //}

});