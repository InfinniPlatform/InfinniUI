var editorBaseBuilderMixin = {
    initialize_editorBaseBuilder: function () {

    },

    /**
     *
     * @param params
     * @param {Object} [bindingOptions
     * @param {Function} [bindingOptions.converter] Конвертер
     * @param {string} [bindingOptions.valueProperty="value'] Имя атрибута значения
     * @returns {*}
     */


    /**
     *
     * @param params
     * @param bindingOptions
     * @returns {{valueBinding: {DataBinding}}}
     */
    applyMetadata_editorBaseBuilder: function (params, bindingOptions) {
        var metadata = params.metadata;
        var element = params.element;

        bindingOptions = bindingOptions || {};
        bindingOptions.valueProperty = bindingOptions.valueProperty || 'value';

        element.setLabelFloating(metadata.LabelFloating);
        this.initBindingToProperty(params, 'HintText');
        this.resolveExpressionInText(params, 'HintText');
        this.initBindingToProperty(params, 'ErrorText');
        this.resolveExpressionInText(params, 'ErrorText');
        this.initBindingToProperty(params, 'WarningText');
        this.resolveExpressionInText(params, 'WarningText');

        var executorBuilderParams = {
            parentView: params.parentView,
            parent: element,
            basePathOfProperty: params.basePathOfProperty
        };

        if (metadata.OnValueChanging) {
            var onValueChangingExecutor = Executor(metadata.OnValueChanging, params.builder, executorBuilderParams);

            element.onValueChanging(function (context, args) {
                return onValueChangingExecutor(args);
            });
        }
        if (metadata.OnValueChanged) {
            var onValueChangedExecutor = Executor(metadata.OnValueChanged, params.builder, executorBuilderParams);

            element.onValueChanged(function (context, args) {
                onValueChangedExecutor(args);
            });
        }

        if (metadata.Value !== undefined) {
            if (InfinniUI.Metadata.isBindingMetadata(metadata.Value)) {
                var buildParams = {
                    parentView: params.parentView,
                    basePathOfProperty: params.basePathOfProperty
                };

                var dataBinding = params.builder.buildBinding(metadata.Value, buildParams);
                var mergedConverter = mergeConverters(dataBinding.getConverter(), bindingOptions.converter);

                if (mergedConverter) {
                    dataBinding.setConverter(mergedConverter);
                }
                if (bindingOptions.mode) {
                    dataBinding.setMode(bindingOptions.mode);
                }
                dataBinding.bindElement(params.element, bindingOptions.valueProperty);

                this.initValidationResultText(element, dataBinding);

            } else {
                params.element.setValue(metadata.Value);
            }
        }

        function mergeConverters(topPriority, nonPriority) {
            topPriority = topPriority || {};
            nonPriority = nonPriority || {};

            if(!topPriority.toElement && nonPriority.toElement) {
                topPriority.toElement = nonPriority.toElement;
            }

            if(!topPriority.toSource && nonPriority.toSource) {
                topPriority.toSource = nonPriority.toSource;
            }

            if( !topPriority._element && nonPriority._element ) {
                topPriority._element = nonPriority._element;
            }

            return !_.isEmpty(topPriority) ? topPriority : null;
        }

        return {
            valueBinding: dataBinding
        };
    },

    /**
     * @description Инициализация подписки на события валидации для оповещения элемента
     * @param binding
     */
    initValidationResultText: function (element, binding) {
        var source = binding.getSource();
        var property = binding.getSourceProperty();

        if (typeof source.onErrorValidator == 'function') {
            source.onErrorValidator(function (context, args) {
                var result = args.value,
                    text = '';

                if (!result.IsValid && Array.isArray(result.Items)) {
                    text = getTextForItems(result.Items);
                }
                element.setErrorText(text);
            });
        }


        function getTextForItems(items, callback) {
            return items
                .filter(function (item) {
                    return property === item.Property;
                })
                .map(function (item) {
                    return item.Message;
                })
                .join(' ');
        }
    }


};
