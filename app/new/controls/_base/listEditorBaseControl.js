function ListEditorBaseControl(parent) {
    _.superClass(ListEditorBaseControl, this, parent);
    editorBaseControlMixin.call(this);
}

_.inherit(ListEditorBaseControl, Control);

ListEditorBaseControl.prototype.onSelectedItemChanged = function (handler) {
    this.controlModel.onSelectedItemChanged(handler);
};