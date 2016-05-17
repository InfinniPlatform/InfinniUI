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

    setEditor: function (editor) {
        this.control.set('editor', editor);
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
    },

    /**
     * @description Возвращает значение, которое введено в поле редактирования в данный момент
     * @returns {*}
     */
    getRawValue: function () {
        var value = this.getValue(),
            editMask = this.getEditMask();

        if (editMask) {
            var val = editMask.getValue();
            var txt = editMask.getText();

            if (isNotEmpty(val)) {
                value = val;
            } else if (isNotEmpty(txt)) {
                value = txt;
            }
        }

        return value;

        function isNotEmpty(val) {
            return val !== null && typeof val !== 'undefined';
        }
    }

}, editorBaseMixin, labelTextElementMixin);
