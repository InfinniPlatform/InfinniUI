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

        this.initScriptsHandlers(params);


        element.setMultiSelect(metadata.MultiSelect);
        element.setReadOnly(metadata.ReadOnly);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;
        var element = params.element;

        //Скриптовые обработчики на события
        if (params.parent && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (params.parent && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                var value = element.getValue();
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name, value);
            });
        }
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

        element.onValueChanged(function () {
            var items = element.getItems();
            var value = JSON.stringify(element.getValue());
            var itemValue;
            var valueSelector = element.getValueSelector();
            if (!element.getMultiSelect() && Array.isArray(items)) {
                //Установить соотвествующее SelectedItem для источника данных Items
                for (var i = 0; i < items.length; i = i + 1) {
                    itemValue = valueSelector(items[i]);
                    if (JSON.stringify(itemValue) === value) {
                        continue;
                    }
                    var ds = metadata.Items.PropertyBinding || {};
                    parent.getExchange().send(messageTypes.onSetSelectedItem,{
                        value : items[i],
                        dataSource: ds.DataSource,
                        property: ds.Property
                    });
                    break;
                }
            }

        });

        binding.onPropertyValueChanged(function (dataSourceName, value) {
            element.setItems(value.value);
        });


        var items = binding.getPropertyValue();
        if (items) {
            element.setItems(items);
        }
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
                var itemTemplateElement = builder.build(params.parent, metadata.ItemTemplate, collectionProperty);
                return itemTemplateElement.render();
            };

            //itemTemplate = function (value, index) {
            //    var collectionProperty = new ListBoxItemCollectionProperty('', index, params.collectionProperty);
            //    var itemTemplateElement = builder.build(params.parent, metadata.ItemTemplate, collectionProperty);
            //    return itemTemplateElement.render();
            //}
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

