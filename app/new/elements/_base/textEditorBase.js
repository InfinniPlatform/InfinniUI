/**
 *
 * @param parent
 * @constructor
 * @augments Element
 * @mixes editorBaseMixin
 */
function TextEditorBase(parent) {
    _.superClass(TextEditorBase, this, parent);
    editorBaseMixin.call(this);
}

_.inherit(TextEditorBase, Element);

TextEditorBase.prototype.setLabelText = function (value) {
    this.control.set('labelText', value);
};

TextEditorBase.prototype.getLabelText = function () {
    return this.control.get('labelText');
};

TextEditorBase.prototype.setLabelFloating = function (value) {
    this.control.set('labelFloating', value);
};

TextEditorBase.prototype.getLabelFloating = function () {
    return this.control.get('labelFloating');
};

TextEditorBase.prototype.setDisplayFormat = function (value) {
    this.control.set('displayFormat', value);
};

TextEditorBase.prototype.getDisplayFormat = function () {
    return this.control.get('displayFormat');
};

TextEditorBase.prototype.setEditMask = function (value) {
    this.control.set('editMask', value);
};

TextEditorBase.prototype.getEditMask = function () {
    return this.control.get('editMask');
};
