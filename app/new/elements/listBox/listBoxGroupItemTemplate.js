/**
 * @constructor
 * @extends ListEditorBaseGroupItemTemplate
 */
function ListBoxGroupItemTemplate() {
    ListEditorBaseGroupItemTemplate.apply(this, Array.prototype.slice.call(arguments));
}

ListBoxGroupItemTemplate.prototype = Object.create(ListEditorBaseGroupItemTemplate.prototype);
ListBoxGroupItemTemplate.prototype.constructor = ListBoxGroupItemTemplate;

ListBoxGroupItemTemplate.prototype.getItemPropertyTemplate = function (params) {

    //var metadata = params.metadata;
    //var element = params.element;
    //var parent = params.parent;
    //var builder = params.builder;
    //var itemsCollection = element.getItems();
    //
    //return function (context, argument) {
    //    var index = argument.index;
    //    var item = argument.item;
    //    var getText = function () {
    //        return InfinniUI.ObjectUtils.getPropertyValue(item, metadata.GroupItemProperty);
    //    };
    //    var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
    //
    //    var label = builder.build(parent, {
    //        Label: {
    //            Text: getText()
    //        }
    //    }, collectionProperty);
    //
    //    itemsCollection.onChange(function (context, argument) {
    //        label.setText(InfinniUI.ObjectUtils.getPropertyValue(item, metadata.GroupItemProperty));
    //    });
    //    return label;
    //}
};

ListBoxGroupItemTemplate.prototype.getItemFormatTemplate = function (params) {
    var metadata = params.metadata;
    var element = params.element;
    var parent = params.parent;
    var builder = params.builder;
    var itemsCollection = element.getItems();

    return function (context, argument) {
        var index = argument.index;
        var item = argument.item;

        var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
        var label = builder.build(parent, {
            Label: {
                Value: {
                    ObjectBinding: {
                        Value: item
                    }
                },
                DisplayFormat: metadata.GroupItemFormat
            }
        }, collectionProperty);

        return label;
    }
};

ListBoxGroupItemTemplate.prototype.getItemSelectorTemplate = function (params) {

};
