/**
 *
 * @constructor
 * @augments ContainerItemTemplate
 */
function StackPanelItemTemplate() {
    ContainerItemTemplate.apply(this, Array.prototype.slice.call(arguments));
}

StackPanelItemTemplate.prototype = Object.create(ContainerItemTemplate.prototype);
StackPanelItemTemplate.prototype.constructor = StackPanelItemTemplate;

StackPanelItemTemplate.prototype.getItemTemplate = function (params) {
    var
    //metadata = params.metadata,
        element = params.element,
        builder = params.builder,
        parent = params.parent;

    return function (context, argument) {
        var index = argument.index;
        var item = argument.item;
        var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);

        return builder.build(parent, item/*, collectionProperty*/);
    };
};
