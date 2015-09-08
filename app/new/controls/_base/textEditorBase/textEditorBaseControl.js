/**
 *
 * @param parent
 * @constructor
 * @augments Control
 * @mixes editorBaseControlMixin
 */
function TextEditorBaseControl(parent) {
    _.superClass(TextEditorBaseControl, this, parent);
    editorBaseControlMixin.call(this);
}

_.inherit(TextEditorBaseControl, Control);

TextEditorBaseControl.prototype.onSelectedItemChanged = function (handler) {
    this.controlModel.onSelectedItemChanged(handler);
};