function ComboBoxBuilder() {

}

_.inherit(ComboBoxBuilder, ElementBuilder);

_.extend(ComboBoxBuilder.prototype, {

    applyMetadata: function (params) {

        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initFormatProperty(params);
        this.initValueProperty(params, true);
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
        element.setPlaceholder(metadata.Placeholder);
        element.setAutocomplete(metadata.Autocomplete || 'Server');
        element.setShowClear(metadata.ShowClear);
        this.initFormatProperty(params);

        var binding;
        if (metadata.Items) {
            var lazyLoad = $.Deferred();

            // Привязка списка значений элемента к источнику данных
            var binding = builder.build(parent, metadata.Items, undefined, {lazyLoad: lazyLoad});

            that.initSearchTermHandler(binding.getDataSource(), params);

            binding.onPropertyValueChanged(function (dataSourceName, value) {
                element.setItems(value.value);
            });


            element.onItemChanged(function() {
                var item = element.getItem(),
                    selectedItem = _.isArray(item) ? item[0] : item;

                parent.getExchange().send(messageTypes.onSetSelectedItem, {
                    dataSource: binding.getDataSource(),
                    property:binding.getProperty(),
                    value: typeof selectedItem === 'undefined' ? null : selectedItem
                });
            });


            var items = binding.getPropertyValue();
            if (items) {
                element.setItems(items);
            }

            element.onFirstOpening(function(){
                lazyLoad.resolve();
            });

        }

        this.initSelectView(element, builder, metadata, parent, binding);

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

    initSearchTermHandler: function (datasource, params) {
        var args = {
            source: params.element,
            dataSource: datasource,
            value: ''
        };
        var view = params.parent;
        var exchange = view.getExchange();

        params.element.onChangeTerm(function (term) {
            args.value = term;
            exchange.send(messageTypes.onSetTextFilter, args);
        });

    },

    createElement: function (params) {
        return new ComboBox(params.parent);
    },

    initSelectView: function(element, builder, metadata, parent, binding){
        if( !metadata.SelectView ){
            return;
        }

        var itemFormat = element.getFormat(),
            displayProperty = element.getDisplayProperty(),
            valueProperty = element.getValueProperty();

        var getItem = function (item) {
            var
                text = element.getDisplayValue(item),
                id = InfinniUI.ObjectUtils.getPropertyValue(item, valueProperty) || item.Id;

            return {Id: id, DisplayName: text};
        };


        element.setSelectView(true);
        element.setOpenListFunction(function(){
            builder.build(parent, metadata.SelectView).createView(function (view) {
                view.onClosed(function (result) {

                    var item = view.getDataSources()[0].getSelectedItem();
                    if (result == dialogResult.accept && item) {
                        var value = _.isArray(item) ? _.map(item, getItem) : getItem(item);
                        binding.refresh(function () {
                            element.setValue(value);
                        });

                    }
                });

                view.open();
            });
        });
    }

}, builderValuePropertyMixin, builderFormatPropertyMixin, builderFormatPropertyMixin);

//function ComboBoxBuilder() {
//
//    this.build = function (builder, parent, metadata) {
//
//        var comboBox = new ComboBox(parent);
//
//
//        if(metadata.Value != undefined) {
//            // Привязка значения элемента к источнику данных
//            var binding = builder.build(parent, metadata.Value);
//
//            binding.onPropertyValueChanged = function(dataSourceName,value) {
//                comboBox.setValue(value.value);
//            };
//
//            // Привязка источника данных к значению элемента
//            comboBox.onValueChanged(function () {
//                binding.setPropertyValue(comboBox.getValue());
//            });
//        }
//
//        window.Combobox = window.Combobox || [];
//        window.Combobox.push(comboBox);
//        return comboBox;
//    };
//}
