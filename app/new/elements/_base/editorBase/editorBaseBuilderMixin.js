var editorBaseBuilderMixin = {
    initialize_editorBaseBuilder: function(){

    },

    applyMetadata_editorBaseBuilder: function (params) {

        var metadata = params.metadata;
        var element = params.element;

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
            var dataBinding = params.builder.build(metadata.Value, buildParams);

            dataBinding.bindElement(params.element, 'value');
        }
    }
};