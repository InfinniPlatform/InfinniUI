function ContainerBuilder() {
    _.superClass(ContainerBuilder, this);
}

_.inherit(ContainerBuilder, ElementBuilder);

ContainerBuilder.prototype.applyMetadata = function (params) {
    var metadata = params.metadata;
    ElementBuilder.prototype.applyMetadata.call(this, params);
    this.initItemTemplate(params);
};

ContainerBuilder.prototype.initItemTemplate = function (params) {
    var metadata = params.metadata;
    var element = params.element;
    var parent = params.parent;
    var builder = params.builder;
    var itemsCollection = element.getItems();
    var itemTemplate;

    //@TODO Заменить на реализацию ч/з стратегию
    if (metadata.ItemTemplate) {
        itemTemplate = function (context, argument) {
            var index = argument.index;
            var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
            return builder.build(parent, metadata.ItemTemplate, collectionProperty);
        };
    } else if (metadata.DisplayProperty) {
        itemTemplate = function (context, argument) {
            var index = argument.index;
            var item = argument.item;
            var getText = function () {
                return InfinniUI.ObjectUtils.getPropertyValue(item, metadata.DisplayProperty);
            };
            var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
            //@TODO Напр. для DataGrid д.б. другая реализация (строка таблицы)
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
    } else if (metadata.ItemFormat) {
        itemTemplate = function (context, argument) {
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
    } else if (metadata.DisplaySelector) {
        itemTemplate = function (context, argument) {
            var index = argument.index;
            var item = argument.item;
            var scriptExecutor = new ScriptExecutor(params.parent);
            var getText = function () {
                return scriptExecutor.executeScript(metadata.DisplaySelector.Name, argument)
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
        }
    }

    element.setItemTemplate(itemTemplate);
};