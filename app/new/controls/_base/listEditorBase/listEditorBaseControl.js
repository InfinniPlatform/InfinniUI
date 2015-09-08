function ListEditorBaseControl(parent) {
    _.superClass(ListEditorBaseControl, this, parent);
    editorBaseControlMixin.call(this);
}

_.inherit(ListEditorBaseControl, ContainerControl);

ListEditorBaseControl.prototype.onSelectedItemChanged = function (handler) {
    this.controlModel.onSelectedItemChanged(handler);
};