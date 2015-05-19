function TreeViewBuilder () {

}

_.inherit(TreeViewBuilder, ElementBuilder);

_.extend(TreeViewBuilder.prototype, {

    applyMetadata: function (params) {

        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initFormatProperty(params);
        this.initValueProperty(params);
        this.initScriptsHandlers(params);

        var element = params.element,
            builder = params.builder,
            metadata = params.metadata,
            parent = params.parent,
            that = this;

        element.setMultiSelect(metadata.MultiSelect);
        element.setReadOnly(metadata.ReadOnly);
        element.setDisplayProperty(metadata.DisplayProperty);
        element.setValueProperty(metadata.ValueProperty);
        element.setKeyProperty(metadata.KeyProperty);
        element.setParentProperty(metadata.ParentProperty);
        this.initFormatProperty(params);

        if (metadata.Items) {
            // Привязка списка значений элемента к источнику данных
            var binding = builder.build(parent, metadata.Items);

            binding.onPropertyValueChanged(function (dataSourceName, value) {
                element.setItems(value.value);
            });

            element.onValueChanged(function (context, args) {
                parent.getExchange().send(messageTypes.onSetSelectedItem, {
                    dataSource: binding.getDataSource(),
                    property: '',
                    value: element.getSelectedItem()
                });
            });

            var items = binding.getPropertyValue();
            if (items) {
                element.setItems(items);
            }
        }
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.parent && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (params.parent && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name);
            });
        }
    },

    createElement: function (params) {
        return new TreeView(params.parent);
    }

}, builderValuePropertyMixin, builderFormatPropertyMixin, builderFormatPropertyMixin);
