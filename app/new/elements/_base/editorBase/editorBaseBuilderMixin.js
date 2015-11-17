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

        element.setHintText(metadata.HintText);
        element.setErrorText(metadata.ErrorText);
        element.setWarningText(metadata.WarningText);

        if (metadata.OnValueChanging) {
            element.onValueChanging(function (context, args) {
                var scriptExecutor = new ScriptExecutor(params.parentView);
                return scriptExecutor.executeScript(metadata.OnValueChanging.Name, args);
            });
        }
        if (metadata.OnValueChanged) {
            element.onValueChanged(function (context, args) {
                new ScriptExecutor(params.parentView).executeScript(metadata.OnValueChanged.Name, args);
            });
        }

        if (metadata.Value !== undefined) {
            var buildParams = {
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            };

            var dataBinding = params.builder.build(metadata.Value, buildParams);
            if (bindingOptions.converter) {
                dataBinding.setConverter(bindingOptions.converter);
            }
            dataBinding.bindElement(params.element, bindingOptions.valueProperty);

            var source = dataBinding.getSource();
            if (typeof source.tryInitData == 'function') {
                source.tryInitData();
            }

            this.initValidationResultText(element, dataBinding);
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

        source.onErrorValidator(function (context, args) {
            var result = args.value,
                text = '';

            if (!result.isValid && Array.isArray(result.items)) {
                text = getTextForItems(result.items);
            }
            element.setErrorText(text);
        });

        source.onWarningValidator(function (context, args) {
            var result = args.value,
                text = '';

            if (!result.isValid && Array.isArray(result.items)) {
                text = getTextForItems(result.items);
            }
            element.setWarningText(text);
        });

        function getTextForItems(items, callback) {
            return items
                .filter(function (item) {
                    return property === item.property;
                })
                .map(function (item) {
                    return item.message;
                })
                .join(' ');
        }
    }
};
