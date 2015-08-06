function ListEditorBaseBuilder() {
    _.superClass(ListEditorBaseBuilder, this);

    editorBaseBuilderMixin.call(this);
}

_.inherit(ListEditorBaseBuilder, ContainerBuilder);

ListEditorBaseBuilder.prototype.applyMetadata = function (params) {

    ContainerBuilder.prototype.applyMetadata.call(this, params);
    editorBaseBuilderMixin.prototype.applyMetadata.call(this, params);

    var metadata = params.metadata;
    var element = params.element;

    element.setMultiSelect(metadata.MultiSelect);
    element.setValueSelector(metadata.ValueSelector);
    element.setGroupValueSelector(metadata.GroupValueSelector);
    element.setGroupItemTemplate(metadata.GroupItemTemplate);
    element.setGroupItemComparator(metadata.GroupItemComparator);

    if (metadata.OnSelectedItemChanged) {
        element.onSelectedItemChanged(function (context, args) {
            new ScriptExecutor(params.parent).executeScript(metadata.OnSelectedItemChanged.Name, args);
        });
    }

};