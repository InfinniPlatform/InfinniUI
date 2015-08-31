/**
 *
 * @constructor
 * @augments ListEditorBaseItemTemplate
 */
function ListBoxItemTemplate() {
    ListEditorBaseItemTemplate.apply(this, Array.prototype.slice.call(arguments));
}

ListBoxItemTemplate.prototype = Object.create(ListEditorBaseItemTemplate.prototype);
ListBoxItemTemplate.prototype.constructor = ListBoxItemTemplate;

ListBoxItemTemplate.prototype.getItemPropertyTemplate = function (params) {
    var metadata = params.metadata;
    var element = params.element;
    var parent = params.parent;
    var builder = params.builder;
    var itemsCollection = element.getItems();

    return function (context, argument) {
        var index = argument.index;
        var item = argument.item;
        var getText = function () {
            return InfinniUI.ObjectUtils.getPropertyValue(item, metadata.ItemProperty);
        };
        var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);

        var label = builder.build(parent, {
            Label: {
                Text: getText()
            }
        }, collectionProperty);

        itemsCollection.onChange(function (context, argument) {
            label.setText(getText());
        });
        return label;
    }
};

ListBoxItemTemplate.prototype.getItemFormatTemplate = function (params) {
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
                DisplayFormat: metadata.ItemFormat
            }
        }, collectionProperty);
        itemsCollection.onChange(function (context, argument) {
            //@TODO Перерисовать??
        });
        return label;
    }
};

ListBoxItemTemplate.prototype.getItemSelectorTemplate = function (params) {
    var metadata = params.metadata;
    var element = params.element;
    var parent = params.parent;
    var builder = params.builder;
    var itemsCollection = element.getItems();

    return function (context, argument) {
        var index = argument.index;
        var item = argument.item;
        var scriptExecutor = new ScriptExecutor(params.parent);
        var getText = function () {
            return scriptExecutor.executeScript(metadata.ItemSelector.Name, {value: item})
        };

        var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
        var label = builder.build(parent, {
            Label: {
                Text: getText()
            }
        }, collectionProperty);

        itemsCollection.onChange(function (context, argument) {
            label.setText(getText());
        });

        return label;
    }
};