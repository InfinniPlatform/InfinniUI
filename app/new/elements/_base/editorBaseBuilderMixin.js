function editorBaseBuilderMixin() {

}

editorBaseBuilderMixin.prototype.applyMetadata = function applyMetadata(params) {

    var metadata = params.metadata;
    var element = params.element;

    //@TODO Реализовать value
    element.setHintText(metadata.HintText);
    element.setErrorText(metadata.ErrorText);
    element.setWarningText(metadata.WarningText);
    if (metadata.OnValueChanging) {
        element.onValueChanging(function (context, args) {
            new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanging.Name, args);
        });
    }
    if (metadata.OnValueChanged) {
        element.onValueChanged(function (context, args) {
            new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name, args);
        });
    }
};
