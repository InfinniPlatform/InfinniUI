/**
 *
 * @constructor
 */
function ListEditorBaseGroupItemTemplate() {

}

ListEditorBaseGroupItemTemplate.prototype.getItemTemplate = function (params) {
    var
        itemTemplate,
        metadata = params.metadata;

    if (metadata.GroupItemTemplate) {
        itemTemplate = this.getGroupItemTemplate(params);
    } else if (metadata.GroupItemProperty) {
        itemTemplate = this.getItemPropertyTemplate(params);
    } else if (metadata.GroupItemFormat) {
        itemTemplate = this.getItemFormatTemplate(params)
    } else if (metadata.GroupItemSelector) {
        itemTemplate = this.getItemSelectorTemplate(params);
    } else {
        //@TODO ??
        throw new Error('Не определен способ отображения группы элементов');
    }
    return itemTemplate;
};

ListEditorBaseGroupItemTemplate.prototype.getGroupItemTemplate = function (params) {
    return function (context, argument) {
        var index = argument.index;
        var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
        return params.builder.build(params.parent, params.metadata.ItemTemplate, collectionProperty);
    };
};

/**
 * @abstract
 * @param params
 */
ListEditorBaseGroupItemTemplate.prototype.getItemPropertyTemplate = function (params) {
    throw new Error('Не перегружен метод getItemPropertyTemplate');
};

/**
 * @abstract
 * @param params
 */
ListEditorBaseGroupItemTemplate.prototype.getItemFormatTemplate = function (params) {
    throw new Error('Не перегружен метод getItemFormatTemplate');
};

/**
 * @abstract
 * @param params
 */
ListEditorBaseGroupItemTemplate.prototype.getItemSelectorTemplate = function (params) {
    throw new Error('Не перегружен метод getItemSelectorTemplate');
};
