function ListBoxBuilder() {

}

_.inherit(ListBoxBuilder, ElementBuilder);

_.extend(ListBoxBuilder.prototype, {

    applyMetadata: function (params) {
        var metadata = params.metadata;
        var element = params.element;
        var parent = params.parent;
        var builder = params.builder;

        //Element
        ElementBuilder.prototype.applyMetadata.call(this, params);

        //Container
        this.setItemTemplate(this.buildItemTemplate());
        this.initItemsBinding(params);

        //EditorBase
        //@TODO value
        element.setHintText(metadata.HintText);
        element.setErrorText(metadata.ErrorText);
        element.setWarningText(metadata.WarningText);
        if (metadata.OnValueChanging) {
            element.onValueChanging(function (context, args) {
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanging.Name, args);
            });
        }
        if (metadata.OnValueChanged) {
            element.onValueChanged(function (context, args) {
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name, args);
            });
        }

        //ListEditorBase
        element.setMultiSelect(metadata.MultiSelect);
        element.setValueSelector(metadata.ValueSelector);
        element.setGroupValueSelector(metadata.GroupValueSelector);
        element.setGroupItemTemplate(metadata.GroupItemTemplate);
        element.setGroupItemComparator(metadata.GroupItemComparator);

        if (metadata.OnSelectedItemChanged) {
            element.onSelectedItemChanged(function (context, args) {
                new ScriptExecutor(params.parent).executeScript(metadata.OnSelectedItemChanged.Name, args);
            });
        }
    },

    buildItemTemplate: function (params) {
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
                return builder.build(builder, parent, metadata.ItemTemplate, collectionProperty);
            };
        } else if (metadata.DisplayProperty) {
            itemTemplate = function (context, argument) {
                var index = argument.index;
                var item = argument.item;
                var getText = function () {
                    return InfinniUI.ObjectUtils.getPropertyValue(item, metadata.DisplayProperty);
                };
                var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
                var label = builder.build(builder, parent, {
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
            itemTemplate = function(context, argument) {
                var index = argument.index;
                var item = argument.item;

                var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);
                var label = builder.build(builder, parent, {
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
                var label = builder.build(builder, parent, {
                    Label: {
                        Text: getText()
                    }
                }, collectionProperty);

                itemsCollection.onChange(function (context, argument) {
                    label.setText(getText());
                });
            }
        }

        return itemTemplate;
    },

    initItemsBinding: function (params) {
        var metadata = params.metadata.Items;
        var itemsCollection = this.getItems();
        if(!metadata) {
            return;
        }

        var binding = params.builder.build(builder, params.parent, metadata, params.collectionProperty);

        if (typeof binding !== 'undefined' && binding !== null) {
            binding.onPropertyValueChanged(function (context, argument) {
                var newItems = argument.value;

                if (!Array.isArray(newItems)) {
                    itemsCollection.clear();
                    return;
                }

                //Удалить элементы, которых нет в новых данных
                itemsCollection
                    .filter(function (item) {
                        return newItems.indexOf(item) === -1;
                    })
                    .forEach(function(item) {
                        itemsCollection.remove(item);
                    });

                //Добавить новые элементы,которые появились в данных
                newItems.filter(function (item) {
                        return !itemsCollection.contains(item)
                    })
                    .forEach(function(item){
                        itemsCollection.add(item);
                    });

            });
        }
        return binding;
    }


});