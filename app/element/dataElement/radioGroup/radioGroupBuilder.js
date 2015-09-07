function RadioGroupBuilder() {
}

_.inherit(RadioGroupBuilder, ElementBuilder);

_.extend(RadioGroupBuilder.prototype, {

        applyMetadata: function (params) {
            /** @type {RadioGroup} */
            var element = params.element;
            var metadata = params.metadata;

            ElementBuilder.prototype.applyMetadata.call(this, params);

            element.setReadOnly(metadata.ReadOnly);
            element.setValueProperty(metadata.ValueProperty);
            element.setDisplayProperty(metadata.DisplayProperty);
            element.setOrientation(metadata.Orientation);

            if (_.isEmpty(metadata.ItemFormat) === false) {
                var format = params.builder.build(params.parent, metadata.ItemFormat);
                element.setItemFormat(format);
            }


            this.initItemTemplate(params);
            this.initScriptsHandlers(params);
            this.initValueProperty(params, true);
            this.initItems(params);
        },

        initItemTemplate: function (params) {
            var metadata = params.metadata;

            if (_.isEmpty(metadata.ItemTemplate)) {
                return;
            }

            var itemTemplate = function (baseIndex) {
                var collectionProperty = new ListBoxItemCollectionProperty('', baseIndex, params.collectionProperty);
                return params.builder.build(params.parent, metadata.ItemTemplate, collectionProperty);
            };

            params.element.setItemTemplate(itemTemplate);
        },

        initItems: function (params) {
            var metadata = params.metadata;
            if (_.isEmpty(metadata.Items)) {
                return;
            }

            var binding = params.builder.build(params.parent, metadata.Items, params.collectionProperty);

            var setItems = function (value) {
                params.element.setItems(value);
            };

            binding.onPropertyValueChanged(function (dataSourceName, value) {
                setItems(value.value)
            });

            setItems(binding.getPropertyValue());
        },

        initScriptsHandlers: function(params){
            var metadata = params.metadata;

            //Скриптовые обработчики на события

            if (params.parent && metadata.OnValueChanged){
                params.element.onValueChanged(function() {
                    new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name);
                });
            }
        },

        createElement: function (params) {
            return new RadioGroup(params.parent);
        }

    },
    builderValuePropertyMixin
);