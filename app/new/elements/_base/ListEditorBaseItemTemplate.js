/**
 *
 * @constructor
 * @augments ContainerItemTemplate
 */
function ListEditorBaseItemTemplate() {
    ContainerItemTemplate.apply(this, Array.prototype.slice.call(arguments));
}

ListEditorBaseItemTemplate.prototype = Object.create(ContainerItemTemplate.prototype);
ListEditorBaseItemTemplate.prototype.constructor = ListEditorBaseItemTemplate;

/**
 *
 * @param {Object} params
 */
ListEditorBaseItemTemplate.prototype.getItemTemplate = function (params) {
    var
        itemTemplate,
        metadata = params.metadata;

    if (metadata.ItemTemplate) {
        itemTemplate = this.getDefaultItemTemplate(params);
    } else if (metadata.ItemProperty) {
        itemTemplate = this.getItemPropertyTemplate(params);
    } else if (metadata.ItemFormat) {
        itemTemplate = this.getItemFormatTemplate(params)
    } else if (metadata.ItemSelector) {
        itemTemplate = this.getItemSelectorTemplate(params);
    } else {
        //@TODO ??
        throw new Error('Не определен способ отображения элементов');
    }
    return itemTemplate;
};

ListEditorBaseItemTemplate.prototype.getDefaultItemTemplate = function (params ) {
    var itemTemplate = function (context, argument) {
        var index = argument.index;
        var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
        return params.builder.build(params.parent, params.metadata.ItemTemplate, collectionProperty);
    };

    return itemTemplate;
};

/**
 * @abstract
 */
ListEditorBaseItemTemplate.prototype.getItemPropertyTemplate = function () {
    throw new Error('Не перегружен метод getItemPropertyTemplate');
};

/**
 * @abstract
 */
ListEditorBaseItemTemplate.prototype.getItemFormatTemplate = function () {
    throw new Error('Не перегружен метод getItemFormatTemplate');
};

/**
 * @abstract
 */
ListEditorBaseItemTemplate.prototype.getItemSelectorTemplate = function () {
    throw new Error('Не перегружен метод getItemSelectorTemplate');
};
