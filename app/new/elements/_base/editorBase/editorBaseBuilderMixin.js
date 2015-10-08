var editorBaseBuilderMixin = {
    initialize_editorBaseBuilder: function(){

    },

    /**
     *
     * @param params
     * @param {Object} [bindingOptions
     * @param {Function} [bindingOptions.converter] Конвертер
     * @param {string} [bindingOptions.valueProperty="value'] Имя атрибута значения
     * @returns {*}
     */
    applyMetadata_editorBaseBuilder: function (params, bindingOptions) {

        var metadata = params.metadata;
        var element = params.element;

        bindingOptions = bindingOptions || {};
        _.defaults(bindingOptions, {
            valueProperty: 'value'
        });

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
        }

        return dataBinding;
    }
};