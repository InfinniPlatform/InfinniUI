function ListBoxBuilder() {

}

_.inherit(ListBoxBuilder, ElementBuilder);

_.extend(ListBoxBuilder.prototype, {

    applyMetadata: function (params) {
        var element = params.element,
            builder = params.builder,
            metadata = params.metadata,
            parent = params.parent;

        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initValueProperty(params, true);
        this.initValueSelector(params);
        this.initItemsBinding(params);
        this.initItemTemplate(params);
        this.initGroupTemplate(params);
        this.initScriptsHandlers(params);


        element.setMultiSelect(metadata.MultiSelect);
        element.setReadOnly(metadata.ReadOnly);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;
        var element = params.element;

        //Скриптовые обработчики на события
    },


    createElement: function (params) {
        return new ListBox(params.parent);
    },

    initValueSelector: function (params) {
        var metadata = params.metadata;
        var element = params.element;

        element.setValueProperty(metadata.ValueProperty);
        var selector;
        if (metadata.ValueProperty) {
            selector = function (item) {
                return InfinniUI.ObjectUtils.getPropertyValue(item, metadata.ValueProperty);
            }
        } else {
            selector = function (item) {
                return item;
            }
        }
        element.setValueSelector(selector);
    },

    initItemsBinding: function (params) {
        var parent = params.parent;
        var metadata = params.metadata;
        var element = params.element;
        var binding;

        if (!metadata.Items) {
            return;
        }

        // Привязка списка значений элемента к источнику данных
        var binding = params.builder.build(parent, metadata.Items, params.collectionProperty);

        element.onChangeSelectedItem(function () {
            var selectedItem = element.getSelectedItem();
            var ds = metadata.Items.PropertyBinding || {};
            parent.getExchange().send(messageTypes.onSetSelectedItem,{
                value : selectedItem,
                dataSource: ds.DataSource,
                property: ds.Property
            });
        });

        /**
         * @TODO Добавить обратную подписку на установкку SelectedItem из DataSource в ListBox
         */

        binding.onPropertyValueChanged(function (dataSourceName, value) {
            element.children.clear();//При изменении списка - старые элементы уничтожаются!
            element.setItems(value.value);
        });


        var items = binding.getPropertyValue();
        if (items) {
            element.setItems(items);
        }
    },

    initGroupTemplate: function (params) {
        var groupTemplate = {};
        var metadata = params.metadata,
            builder = params.builder,
            parent = params.parent,
            element = params.element;


        if (!metadata.GroupTemplate) {
            return null;
        }

        metadata = metadata.GroupTemplate.BaseListGroup;

        var
            valueSelector,
            itemTemplate;

        if (metadata.ValueProperty) {
            valueSelector = function (value, index) {
                return InfinniUI.ObjectUtils.getPropertyValue(value, metadata.ValueProperty);
            }
        } else {
            valueSelector = function (value, index) {
                return value;
            }
        }
        groupTemplate.valueSelector = valueSelector;

        if (metadata.ItemTemplate) {
            itemTemplate = function (value, index) {
                var collectionProperty = new ListBoxItemCollectionProperty('', index, params.collectionProperty);
                var itemTemplateElement = builder.build(params.parent, metadata.ItemTemplate, collectionProperty, {parentElement: element});
                return itemTemplateElement.render();
            };
        } else if (metadata.DisplaySelector) {

            var itemTemplate = function (value, index) {
                var message = {
                    value: value,
                    index: index
                };
                var executor = new ScriptExecutor(parent);
                return executor.executeScript(metadata.DisplaySelector.Name, message);
            }
        } else {
            var format;
            if (metadata.ItemFormat) {
                format = builder.build(params.parent, metadata.ItemFormat, params.collectionProperty);
            }

            if (metadata.DisplayProperty) {
                itemTemplate = function (value, index) {
                    var propertyValue = InfinniUI.ObjectUtils.getPropertyValue(value, metadata.DisplayProperty);
                    if (format) {
                        propertyValue = format.format(propertyValue);
                    }

                    return String(propertyValue);
                }
            } else {
                itemTemplate = function(value, index) {
                    var valueProperty = format ? format(value) : value;

                    return String(valueProperty);
                }
            }
        }

        groupTemplate.itemTemplate = itemTemplate;
        element.setCollapsible(!!metadata.Collapsible);
        element.setCollapsed(!!metadata.Collapsed);
        element.setGroupTemplate(groupTemplate);

        return groupTemplate;
    },

    initItemTemplate: function (params) {
        var
            metadata = params.metadata,
            builder = params.builder,
            element = params.element,
            itemTemplate;

        //@TODO DisplayProperty или ItemFormat или ItemTemplate
        if (metadata.ItemTemplate) {
            itemTemplate = function (value, index) {
                var collectionProperty = new ListBoxItemCollectionProperty('', index, params.collectionProperty);
                var itemTemplateElement = builder.build(params.parent, metadata.ItemTemplate, collectionProperty, {parentElement: element});
                return itemTemplateElement.render();
            };
        } else {
            var format;
            if (metadata.ItemFormat) {
                format = builder.build(params.parent, metadata.ItemFormat, params.collectionProperty);
                element.setItemFormat(format);
            }

            element.setDisplayProperty(metadata.DisplayProperty);
            if (metadata.DisplayProperty) {
                itemTemplate = function (value, index) {
                    var propertyValue = InfinniUI.ObjectUtils.getPropertyValue(value, metadata.DisplayProperty);
                    if (format) {
                        propertyValue = format.format(propertyValue);
                    }

                    return String(propertyValue);
                }
            } else {
                itemTemplate = function(value, index) {
                    var valueProperty = format ? format(value) : value;

                    return String(valueProperty);
                }
            }
        }


        element.setItemTemplate(itemTemplate);
    }


}, builderValuePropertyMixin);

