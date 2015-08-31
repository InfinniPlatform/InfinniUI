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

TextBox.prototype.createControl = function (parent) {
    return new TextBoxControl(parent);
};

TextBox.prototype.getMultiline = function () {
    return this.control.get('multiline');
};

TextBox.prototype.setMultiline = function (value) {
    this.control.set('multiline', value);
};

TextBox.prototype.getLineCount = function () {
    return this.control.get('lineCount');
};

TextBox.prototype.setLineCount = function (value) {
    this.control.set('lineCount', value);
};


