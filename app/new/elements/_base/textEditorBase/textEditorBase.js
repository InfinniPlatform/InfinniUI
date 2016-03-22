/**
 *
 * @param parent
 * @constructor
 * @augments Element
 * @mixes editorBaseMixin
 * @mixes labelTextElementMixin
 */
function TextEditorBase(parent) {
    _.superClass(TextEditorBase, this, parent);
    this.initialize_editorBase();
}

_.inherit(TextEditorBase, Element);

_.extend(TextEditorBase.prototype, {

    setDisplayFormat: function (value) {
        this.control.set('displayFormat', value);
    },

    getDisplayFormat: function () {
        return this.control.get('displayFormat');
    },

    setEditMask: function (value) {
        this.control.set('editMask', value);
    },

    getEditMask: function () {
        return this.control.get('editMask');
    }
}, editorBaseMixin, labelTextElementMixin);
