/**
 * @augments TextEditorModelBaseModeStrategy
 * @constructor
 */
function TextEditorModelEditModeStrategy() {
    TextEditorModelBaseModeStrategy.call(this);
}

TextEditorModelEditModeStrategy.prototype = Object.create(TextEditorModelBaseModeStrategy.prototype);
TextEditorModelEditModeStrategy.prototype.constructor = TextEditorModelBaseModeStrategy;

TextEditorModelEditModeStrategy.prototype.updateText = function (model) {
    var editMask = model.getEditMask();
    var value = model.get('value');
    var text;

    if (!editMask) {
        text = value;
    } else {
        editMask.reset(value);
        text = editMask.getText();
    }

    model.set('text', text);
};

TextEditorModelEditModeStrategy.prototype.setText = function (model, text, ui) {
    model.set('text', text);
};

TextEditorModelEditModeStrategy.prototype.onChangeTextHandler = function (model, newValue, options) {
    var editMask = model.getEditMask();
    var value = editMask ?  editMask.getData() : newValue;
    model.set('value', model.convertValue(value), {silent: !!editMask});
};

