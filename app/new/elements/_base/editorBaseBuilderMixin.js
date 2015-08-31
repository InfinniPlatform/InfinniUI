function editorBaseBuilderMixin() {

}

/**
 *
 * @param {ElementBuilderParams} params
 */
editorBaseBuilderMixin.applyMetadata = function (params) {

    var metadata = params.metadata;
    var element = params.element;

    //@TODO Реализовать value
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

    //@TODO Init DataBinding on Value
    if (metadata.Value !== undefined) {
        var dataBinding = params.builder.build(params.parent, metadata.Value, params.collectionProperty);

        dataBinding.setElement(params.element);

        if (dataBinding != null) {
            dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                params.element.setValue(dataBinding.getPropertyValue());
            });

            var data = dataBinding.getPropertyValue();
            if (data !== null && typeof data !== 'undefined') {
                params.element.setValue(data);
            }

            params.element.onValueChanged(function (dataSourceName, value) {
                dataBinding.setPropertyValue(value);
            });
        }


        //if (useValidation && dataBinding) {
        //    params.element.onLostFocus(function () {
        //        dataBinding.validate();
        //    });
        //}

        //return dataBinding;
    }
};
