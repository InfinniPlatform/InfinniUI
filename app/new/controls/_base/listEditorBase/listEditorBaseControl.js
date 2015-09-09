function ListEditorBaseControl(parent) {
    _.superClass(ListEditorBaseControl, this, parent);
    this.initialize_editorBaseControl();
}

_.inherit(ListEditorBaseControl, ContainerControl);

_.extend(ListEditorBaseControl.prototype, {

    onSelectedItemChanged: function (handler) {
        this.controlModel.onSelectedItemChanged(handler);
    }
}, editorBaseControlMixin);