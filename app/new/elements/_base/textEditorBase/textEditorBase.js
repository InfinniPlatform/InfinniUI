/**
 *
 * @param parent
 * @constructor
 * @augments Element
 * @mixes editorBaseMixin
 */
function TextEditorBase(parent) {
    _.superClass(TextEditorBase, this, parent);
    this.initialize_editorBase();
}

_.inherit(TextEditorBase, Element);

_.extend(TextEditorBase.prototype, {

    setLabelText: function (value) {
        this.control.set('labelText', value);
    },

    getLabelText: function () {
        return this.control.get('labelText');
    },

    setLabelFloating: function (value) {
        this.control.set('labelFloating', value);
    },

    getLabelFloating: function () {
        return this.control.get('labelFloating');
    },

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
}, editorBaseMixin);
