var editorBaseBuilderMixin = {
    initialize_editorBaseBuilder: function(){

    },

    /**
     *
     * @param params
     * @param {Object} [bindingOptions]
     * @param {string} [bindingOptions.valueProperty = 'value'] Имя свойства значения в элементе
     * @param {string} [bindingOptions.mode = ] Режим работы DataBinding.mode
     * @returns {*}
     */
    applyMetadata_editorBaseBuilder: function (params, bindingOptions) {

        var metadata = params.metadata;
        var element = params.element;

        bindingOptions = bindingOptions || {};
        _.defaults(bindingOptions, {
            valueProperty: 'value',
            mode: 'TwoWay'
        });

        element.setHintText(metadata.HintText);
        element.setErrorText(metadata.ErrorText);
        element.setWarningText(metadata.WarningText);

        if (metadata.OnValueChanging) {
            element.onValueChanging(function (context, args) {
                var scriptExecutor = new ScriptExecutor(params.parent);
                return scriptExecutor.executeScript(metadata.OnValueChanging.Name, args);
            });
        }
        if (metadata.OnValueChanged) {
            element.onValueChanged(function (context, args) {
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name, args);
            });
        }

        if (metadata.Value !== undefined) {
            var buildParams = {
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            };

            for(var i in metadata.Value) {
                //@TODO Исправить после исключения задания типа привязки в метаданных!!
                if (metadata.Value.hasOwnProperty(i)) {
                    metadata.Value[i]['Mode'] = bindingOptions.mode;
                    break;
                }
            }

            var dataBinding = params.builder.build(metadata.Value, buildParams);

            dataBinding.bindElement(params.element, bindingOptions.valueProperty);
        }

        return dataBinding;
    }
};