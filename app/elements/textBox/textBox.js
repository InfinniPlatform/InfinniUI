/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBase
 */
function TextBox(parent) {
    _.superClass(TextBox, this, parent);
}

_.inherit(TextBox, TextEditorBase);

_.extend(TextBox.prototype, {
    createControl: function (parent) {
        return new TextBoxControl(parent);
    },

    getMultiline: function () {
        return this.control.get('multiline');
    },

    setMultiline: function (value) {
        this.control.set('multiline', value);
    },

    getLineCount: function () {
        return this.control.get('lineCount');
    },

    setLineCount: function (value) {
        this.control.set('lineCount', value);
    }

});


